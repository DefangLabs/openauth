import { Context } from "hono";
import { env } from "hono/adapter";
import { analytics } from "../../lib/analytics/analytics";
import { authorizeRequest } from "../../lib/auth/authorize-request";
import { fetchUserinfo } from "../../lib/auth/fetch-userinfo";
import { getJwtFromRequest } from "../../lib/auth/get-jwt-from-request";
import { upsertStripeCustomer } from "../../lib/stripe/upsert-stripe-customer";
import { getStripeClient } from "../../lib/stripe/get-stripe-client";
import { getStripeCustomer } from "../../lib/stripe/get-stripe-customer";

async function authorizeCustomer(req: Context["req"]) {
  const claims = await authorizeRequest(req);
  const defangUserId = claims.sub;

  if (!defangUserId) {
    throw new Error("No subject found in JWT");
  }

  const jwt = getJwtFromRequest(req);
  const userinfo = await fetchUserinfo(jwt!); // jwt is guaranteed to be defined here since we just checked it in authorizeRequest
  const email = userinfo.userinfo.email;

  const customer = await upsertStripeCustomer(defangUserId, { email });

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

  const rootUrl = env<{
    PUBLIC_ROOT_URL: string | undefined;
  }>(c).PUBLIC_ROOT_URL;

  if (!rootUrl) {
    console.error("PUBLIC_ROOT_URL is not set in the environment variables.");
    return c.text("Misconfigured.", 500);
  }

  const session = await stripeClient.billingPortal.sessions.create({
    customer: customer.id,
    return_url: process.env.PUBLIC_ROOT_URL + "/pricing",
  });

  return c.json({ url: session.url }, 201);
}

export async function webhookHandler(c: Context) {
  const { STRIPE_WEBHOOK_SECRET } = env<{
    STRIPE_WEBHOOK_SECRET: string | undefined;
  }>(c);

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set in the environment variables.");
    return c.text("Misconfigured.", 500);
  }

  const signature = c.req.header('stripe-signature');
  const stripe = getStripeClient();

  if (!signature) {
    return c.text('Missing signature', 400);
  }

  try {
    const body = await c.req.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);

    /**
     * Handle:
     * 1.	customer.subscription.created
     * 2.	customer.subscription.deleted
     * 3.	customer.subscription.paused
     * 4.	customer.subscription.resumed
     * 5.	customer.subscription.trial_will_end
     * 6.	customer.subscription.updated
     * 7.	payment_intent.succeeded
     */
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.deleted':
      case 'customer.subscription.paused':
      case 'customer.subscription.resumed':
      case 'customer.subscription.trial_will_end':
      case 'customer.subscription.updated':
        const customerId = event.data.object.customer as string;
        const customer = await stripe.customers.retrieve(customerId);

        if (customer.deleted)
          break;

        const defangUserId = customer.metadata.defangUserId;
        if (!defangUserId) {
          throw new Error('No defangUserId found in customer metadata');
        }

        analytics.identify({
          userId: defangUserId,
          traits: {
            email: customer.email,
            stripeCustomerId: customerId,
          }
        });

        analytics.track({
          userId: defangUserId,
          event: `stripe.${event.type}`,
          properties: {
            subscriptionId: event.data.object.id,
            customerId: customerId,
            status: event.data.object.status,
            priceId: event.data.object.items.data[0]?.price?.id,
            priceName: event.data.object.items.data[0]?.price?.nickname,
            productId: event.data.object.items.data[0]?.price?.product,
          }
        });

        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const paymentCustomerId = paymentIntent.customer as string;

        if (!paymentCustomerId) {
          throw new Error('No customer ID found in payment intent');
        }

        const paymentCustomer = await stripe.customers.retrieve(paymentCustomerId);

        if (paymentCustomer.deleted)
          break;

        const paymentDefangUserId = paymentCustomer.metadata.defangUserId;
        if (!paymentDefangUserId) {
          throw new Error('No defangUserId found in customer metadata');
        }

        analytics.identify({
          userId: paymentDefangUserId,
          traits: {
            email: paymentCustomer.email,
            stripeCustomerId: paymentCustomer.id,
          }
        });

        analytics.track({
          userId: paymentDefangUserId,
          event: `stripe.${event.type}`,
          properties: {
            paymentIntentId: paymentIntent.id,
            customerId: paymentCustomerId,
            revenue: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
          }
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.text('Event received', 200);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err);
    return c.text('Webhook Error', 400);
  }
}

export async function generateCheckoutLink(c: Context) {
  const req = c.req;
  const customer = await authorizeCustomer(req);
  if (!customer) {
    return c.json({ error: "Failed to create customer" }, 500);
  }

  const stripeClient = getStripeClient();

  const rootUrl = env<{
    PUBLIC_ROOT_URL: string | undefined;
  }>(c).PUBLIC_ROOT_URL;

  if (!rootUrl) {
    console.error("PUBLIC_ROOT_URL is not set in the environment variables.");
    return c.text("Misconfigured.", 500);
  }

  // get price ID from request json
  const json = await c.req.json();
  const priceId = json?.input?.input?.priceId;

  if (!priceId || typeof priceId !== 'string') {
    return c.json({ message: 'Invalid request' }, 400);
  }

  const session = await stripeClient.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      },
    ],
    success_url: rootUrl + "/pricing/success",
    cancel_url: rootUrl + "/pricing",
    allow_promotion_codes: true,
  });

  return c.json({ url: session.url }, 201);
}