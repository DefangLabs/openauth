import { Request, Response } from 'express';
import { authorizeRequest } from "../../lib/auth/authorize-request";
import { getAuthedClientForRequest } from '../../lib/defang/get-authed-client-for-request';
import { getStripeClient } from "../../lib/stripe/get-stripe-client";
import { getStripeCustomer } from '../../lib/stripe/get-stripe-customer';
import { createStripeCustomer } from '../../lib/stripe/create-stripe-customer';

async function authorizeCustomer(req: Request) {
    const claims = await authorizeRequest(req);

    const defangClient = await getAuthedClientForRequest(req);

    const whoami = await defangClient.whoAmI({});
    const defangUserId = whoami.userId;

    let customer = await getStripeCustomer(defangUserId);

    if (!customer) {
        customer = await createStripeCustomer(defangUserId, claims['https://defang.io/jwt/claims']?.email);
    }

    return customer
}

export async function createStripeClientSecret(req: Request, res: Response) {
    const customer = await authorizeCustomer(req);
    if (!customer) {
        return res.status(500).json({ error: 'Failed to create customer' });
    }

    const stripeClient = getStripeClient();

    const customerSession = await stripeClient.customerSessions.create({
        customer: customer.id,
        components: {
            pricing_table: {
                enabled: true,
            }
        },
    });

    return res.status(201).json({ secret: customerSession.client_secret });
}

export async function createStripePortalSession(req: Request, res: Response) {
    const customer = await authorizeCustomer(req);
    if (!customer) {
        return res.status(500).json({ error: 'Failed to create customer' });
    }

    const stripeClient = getStripeClient();

    const session = await stripeClient.billingPortal.sessions.create({
        customer: customer.id,
        return_url: process.env.PUBLIC_ROOT_URL + "/account",
    });

    return res.status(201).json({ url: session.url });
}
