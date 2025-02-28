import { Context } from "hono";
import { authorizeRequest } from "../../lib/auth/authorize-request";
import { getAuthedClientForRequest } from "../../lib/defang/get-authed-client-for-request";
import { createStripeCustomer } from "../../lib/stripe/create-stripe-customer";
import { getStripeClient } from "../../lib/stripe/get-stripe-client";
import { getStripeCustomer } from "../../lib/stripe/get-stripe-customer";
import { fetchUserinfo } from "../../lib/auth/fetch-userinfo";
import { getJwtFromRequest } from "../../lib/auth/get-jwt-from-request";

async function authorizeCustomer(req: Context["req"]) {
  const claims = await authorizeRequest(req);
  const defangUserId = claims.sub;

  if (!defangUserId) {
    throw new Error("No subject found in JWT");
  }

  const jwt = getJwtFromRequest(req);
  const userinfo = await fetchUserinfo(jwt!); // jwt is guaranteed to be defined here since we just checked it in authorizeRequest
  const email = userinfo.userinfo.email;

  let defangClient: Awaited<ReturnType<typeof getAuthedClientForRequest>>;
  try {
    defangClient = await getAuthedClientForRequest(req);
  } catch (error) {
    console.error('Failed to authenticate client:', error);
    return null;
  }

  let customer = await getStripeCustomer(defangUserId);

  if (!customer) {
    customer = await createStripeCustomer(defangUserId, { email });
  }

  return customer;
}

export async function createStripeClientSecret(c: Context) {
  const req = c.req;
  const customer = await authorizeCustomer(req);
  if (!customer) {
    return c.json({ error: "Failed to create customer" }, 500);
  }

  const stripe = getStripeClient();

  const customerSession = await stripe.customerSessions.create({
    customer: customer.id,
    components: {
      pricing_table: {
        enabled: true,
      },
    },
  });

  return c.json({ secret: customerSession.client_secret }, 201);
}

export async function createStripePortalSession(c: Context) {
  const req = c.req;
  const customer = await authorizeCustomer(req);
  if (!customer) {
    return c.json({ error: "Failed to create customer" }, 500);
  }

  const stripeClient = getStripeClient();

  const session = await stripeClient.billingPortal.sessions.create({
    customer: customer.id,
    return_url: process.env.PUBLIC_ROOT_URL + "/pricing",
  });

  return c.json({ url: session.url }, 201);
}
