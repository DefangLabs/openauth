/**
 * Tenant deletion service.
 *
 * This handler validates the requesting user's ownership of the tenant,
 * forwards the deletion request to Fabric, and then removes the tenant
 * row from Hasura. All authentication is based on the incoming bearer
 * token so the service can act on behalf of the user.
 */
import { Context } from 'hono';
import { graphql } from '../../graphql';
import { getJwtFromRequest } from '../../lib/auth/get-jwt-from-request';
import { jwtSchema } from '../../lib/auth/jwt-schema';
import { validateJwt } from '../../lib/auth/validate-jwt';
import { getClient } from '../../lib/defang/get-client';
import { getHasuraClient } from '../../lib/hasura/client';

/**
 * Fetches the specified tenant only when it is owned by the provided user.
 * Returning a single row confirms ownership without leaking tenant data.
 */
const tenantOwnershipQuery = graphql(`
  query TenantOwnership($tenantId: uuid!, $ownerId: uuid!) {
    tenants(where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }) {
      id
    }
  }
`);

const deleteTenantMutation = graphql(`
  mutation DeleteTenant($tenantId: uuid!, $ownerId: uuid!) {
    deleteTenants(where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }) {
      affectedRows
    }
  }
`);

/**
 * Verifies that the user owns the tenant. The query filters by both the tenant
 * id and the owner's id, returning a single row only when ownership is valid.
 * Uses the same authorization header from the incoming request to respect row
 * level permissions in Hasura.
 */
async function verifyTenantOwnership(tenantId: string, ownerId: string, token: string) {
  const client = getHasuraClient({ token });
  const response = await client.fetch(tenantOwnershipQuery, { tenantId, ownerId });
  return response.data.tenants.length === 1;
}

/**
 * Calls Fabric to remove the tenant. The user's JWT is passed through so
 * Fabric acts on their behalf. The tenant id is included in the
 * `X-Defang-Tenant-Id` header.
 */
async function deleteTenantInFabric(token: string, tenantId: string) {
  const client = getClient(token);
  await client.deleteMe({}, { headers: { 'X-Defang-Tenant-Id': tenantId } });
}

/**
 * HTTP handler that orchestrates the tenant deletion flow.
 */
export async function initiateDeletion(c: Context) {
  const tenantId = c.req.param('id');
  if (!tenantId) {
    return c.json({ message: 'Missing tenant id' }, 400);
  }

  const token = getJwtFromRequest(c.req);
  if (!token) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const decoded = await validateJwt(token);
  const parsed = jwtSchema.safeParse(decoded);
  if (!parsed.success) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  const userId = parsed.data.sub;

  const ownsTenant = await verifyTenantOwnership(tenantId, userId, token);
  if (!ownsTenant) {
    return c.json({ message: 'Forbidden' }, 403);
  }

  await deleteTenantInFabric(token, tenantId);

  const adminClient = getHasuraClient(); // no token because we're using admin secret
  const hasuraDeletionResponse = await adminClient.fetch(deleteTenantMutation, { tenantId, ownerId: userId });

  if (hasuraDeletionResponse.errors?.length) {
    console.error('@@ hasura deletion error', hasuraDeletionResponse.errors);
    return c.json({ message: hasuraDeletionResponse.errors.map(e => e.message).join('; ') }, 500);
  }

  return c.json({ message: 'Tenant deleted.' });
}
