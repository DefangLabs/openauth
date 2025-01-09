import { create } from '@bufbuild/protobuf';
import { Request, Response } from 'express';
import { heimdallJwtSchema } from '../../lib/auth/heimdall-jwt-schema';
import { validateJwt } from '../../lib/auth/validate-jwt';
import { TokenRequestSchema } from '../../lib/defang/generated/fabric_pb';
import { getClient } from '../../lib/defang/get-client';
import { getStripeClient } from '../../lib/stripe/get-stripe-client';
import { getStripeCustomer } from '../../lib/stripe/get-stripe-customer';


/**
 * Deletes the user from the Kratos database. (eventually our Auth.js service)
 */
async function deleteAuth({ id }: { id: string }) {
    await fetch(`http://${process.env.KRATOS_DOMAIN?.replace('4433', '4434')}/admin/identities/${id}`, {
        method: 'DELETE',
    });
}

/**
 * Calls the deletion endpoint from Fabric, which will take care of removing the user
 * from services like Segment, Intercom, Mixpanel, etc.
 */
async function deleteFabric({ heimdallToken }: { heimdallToken: string }) {
    let defangClient = getClient();
    const defangTokenRequest = create(TokenRequestSchema, {
        assertion: heimdallToken,
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
async function deleteProfile({ id, authorization }: { id: string, authorization: string }) {
    const operation = `
        mutation DeleteProfile($id: uuid!) {
            deleteProfilesByPk(id: $id) {
                id
            }
        }
    `;
    return fetch(`http://${process.env.HASURA_DOMAIN}/v1/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: operation,
            variables: { id },
            operationName: 'DeleteProfile',
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
export async function deleteAccount(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = await validateJwt(token);

    const decodedJwt = heimdallJwtSchema.safeParse(decoded);

    if (!decodedJwt.success) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    const subject = decodedJwt.data.sub;

    if (!subject) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    console.log('@@ deleting from fabric'); // also deletes from Segment, Intercom, Mixpanel, etc.
    const defangUserId = await deleteFabric({ heimdallToken: token });
    console.log('@@ deleting from hasura');
    await deleteProfile({ id: decodedJwt.data.sub, authorization: authHeader });
    console.log('@@ deleting from kratos');
    await deleteAuth({ id: decodedJwt.data.sub });
    console.log('@@ deleting from stripe');
    await deleteStripe({ defangUserId });

    res.status(200).send({ message: 'Account deleted.' });
}
