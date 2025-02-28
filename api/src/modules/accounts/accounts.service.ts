import { create } from '@bufbuild/protobuf';
import { Context } from 'hono';
import { jwtSchema } from '../../lib/auth/jwt-schema';
import { validateJwt } from '../../lib/auth/validate-jwt';
import { TokenRequestSchema } from '../../lib/defang/generated/fabric_pb';
import { getClient } from '../../lib/defang/get-client';
import { getStripeClient } from '../../lib/stripe/get-stripe-client';
import { getStripeCustomer } from '../../lib/stripe/get-stripe-customer';


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

/**
 * Deletes the user from the Hasura database.
 */
async function deleteUser({ id, authorization }: { id: string, authorization: string }) {
    const operation = `
        mutation DeleteUser($id: uuid!) {
            deleteUsersByPk(id: $id) {
                id
            }
        }
    `;
    return fetch(`${process.env.HASURA_ENDPOINT}/v1/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: operation,
            variables: { id },
            operationName: 'DeleteUser',
        }),
        headers: {
            Authorization: authorization,
        },
    }).then(result => result.json());
}

/** Delete from Stripe */
async function deleteStripe({ defangUserId }: { defangUserId: string }) {
    const customer = await getStripeCustomer(defangUserId)
    if (!customer) {
        return;
    }

    const stripe = getStripeClient();
    await stripe.customers.del(customer.id);
}

/**
 * Deletes the user's account, taking care of triggering a variety of deletion
 * operations.
 */
export async function deleteAccount(c: Context) {
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

    console.log('@@ deleting from fabric'); // also deletes from Segment, Intercom, Mixpanel, etc.
    const defangUserId = await deleteFabric({ token });
    console.log('@@ deleting from hasura');
    await deleteUser({ id: decodedJwt.data.sub, authorization: authHeader });
    console.log('@@ deleting from stripe');
    await deleteStripe({ defangUserId });

    return c.json({ message: 'Account deleted.' });
}
