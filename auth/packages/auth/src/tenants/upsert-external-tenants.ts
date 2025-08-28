/**
 * Helpers for linking external organizations to Defang tenants.
 *
 * When a user authenticates we receive a list of organizations from the
 * identity provider (currently GitHub). Each organization is mapped to a
 * deterministic UUID using {@link createExternalTenantId}. This module
 * fetches existing tenant records by that UUID or inserts new ones when
 * necessary. Duplicates are filtered locally so a single organization is only
 * processed once per invocation even if `orgs` contains repeated entries.
 *
 * The `provider` column on the `tenants` table is used to keep track of
 * where an external tenant originated. This column is now part of the
 * database schema and is actively used in the code.
 */
import { graphql } from '../graphql';
import { hasuraAdminClient } from '../hasura/hasura';
import { EnabledProviders } from '../providers/providers';
import { createExternalTenantId } from './create-external-tenant-id';

const tenantByPk = graphql(`
  query TenantByPk($id: uuid!) {
    tenant: tenantsByPk(id: $id) {
      id
      name
    }
  }
`);

const insertTenant = graphql(`
  mutation InsertTenant(
    $id: uuid!
    $name: String!
    $ownerId: uuid!
    $provider: String!
  ) {
    tenant: insertTenantsOne(
      object: { id: $id, name: $name, ownerId: $ownerId, provider: $provider }
    ) {
      id
      name
    }
  }
`);

interface OrgData {
  id: string;
  name: string;
}

export async function upsertExternalTenants(
  provider: EnabledProviders,
  orgs: OrgData[] = [],
  ownerId: string,
) {
  const results: { id: string; name: string }[] = [];
  const seen = new Set<string>();

  for (const org of orgs) {
    const id = createExternalTenantId(provider, org.id);
    if (seen.has(id)) continue;
    seen.add(id);

    const { data } = await hasuraAdminClient(tenantByPk, { id });
    let tenant = data?.tenant;

    if (!tenant) {
      const insertRes = await hasuraAdminClient(insertTenant, {
        id,
        name: org.name,
        ownerId,
        provider,
      });
      tenant = insertRes.data?.tenant;
    }

    if (tenant) {
      results.push({ id: tenant.id, name: tenant.name });
    }
  }

  return results;
}
