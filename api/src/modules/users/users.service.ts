/**
 * User deletion service.
 *
 * Handles the process of permanently removing a user from the system. It checks tenant ownership,
 * calls Fabric to remove analytics data, and finally deletes the user from Hasura.
 */
import { create } from '@bufbuild/protobuf';
import { Context } from 'hono';
import { jwtSchema } from '../../lib/auth/jwt-schema';
import { validateJwt } from '../../lib/auth/validate-jwt';
import { TokenRequestSchema } from '../../lib/defang/generated/fabric_pb';
import { getClient } from '../../lib/defang/get-client';
import { graphql } from '../../graphql';
import { getHasuraClient } from '../../lib/hasura/client';


/**
 * Calls the deletion endpoint from Fabric, which will take care of removing the user
 * from services like Segment, Intercom, Mixpanel, etc.
 */
async function deleteFabric({ token }: { token: string }) {
    let defangClient = getClient();
    const defangTokenRequest = create(TokenRequestSchema, {
        assertion: token,
        scope: ['tail', 'read', 'delete'],
    });
    const defangResponse = await defangClient.token(defangTokenRequest);
    defangClient = getClient(defangResponse.accessToken);
    const whoami = await defangClient.whoAmI({}); // last chance to get the Defang user ID
    await defangClient.deleteMe({});
    return whoami.userId;
}

const deleteUserMutation = graphql(`
    mutation DeleteUser($id: uuid!) {
        deleteUsersByPk(id: $id) {
            id
        }
    }
`);


const ownedTenantsQuery = graphql(`
    query OwnedTenants($ownerId: uuid!) {
        tenants(where: { ownerId: { _eq: $ownerId } }) {
            id
        }
    }
`)

/**
 * Returns a list of tenants owned by the provided user. Uses the same
 * authorization header from the incoming request to respect row level
 * permissions in Hasura.
 */
async function fetchOwnedTenants({ ownerId, token }: { ownerId: string, token: string }) {
    const client = getHasuraClient({ token });
    const response = await client.fetch(ownedTenantsQuery, { ownerId });
    return response.data.tenants;
}

/**
 * Deletes the user, ensuring associated resources are removed.
 */
export async function deleteUser(c: Context) {
    const req = c.req;
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return c.json({ message: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = await validateJwt(token);

    const decodedJwt = jwtSchema.safeParse(decoded);

    if (!decodedJwt.success) {
        return c.json({ message: 'Unauthorized' }, 401);
    }

    const subject = decodedJwt.data.sub;

    if (!subject) {
        return c.json({ message: 'Unauthorized' }, 401);
    }

    // Users cannot delete their account while they still own tenants. Billing
    // information is now tied to tenants and must be cleaned up separately.
    const ownedTenants = await fetchOwnedTenants({ ownerId: subject, token });
    if (ownedTenants.length > 0) {
        return c.json({ message: 'Please transfer or delete your tenants before deleting your account.' }, 409);
    }

    const client = getHasuraClient({ token });
    await client.fetch(deleteUserMutation, { id: subject });
    // TODO: delete user from Segment/Mixpanel

    return c.json({ message: 'User deleted.' });
}
