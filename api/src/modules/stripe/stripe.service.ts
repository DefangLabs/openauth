import { Context } from "hono";
import { env } from "hono/adapter";
import Stripe from "stripe";
import { analytics } from "../../lib/analytics/analytics";
import { fetchUserinfo } from "../../lib/auth/fetch-userinfo";
import { getJwtFromRequest } from "../../lib/auth/get-jwt-from-request";
import { UserinfoResponse } from "../../lib/auth/userinfo-schema";
import { getStripeClient } from "../../lib/stripe/get-stripe-client";
import { upsertStripeCustomer } from "../../lib/stripe/upsert-stripe-customer";
import { getTenantIdFromHeader } from "../../lib/tenants/get-tenant-id-from-header";
import { getUserIdForTenant } from "../../lib/users/get-user-id-for-tenant";

/**
 * Returns true if the user is the owner of the tenant or has a tenant 
 * billing role for the given tenant.
 */
function userHasTenantBillingPermission(userinfo: UserinfoResponse, tenantId: string) {
  return userinfo.userinfo.ownedTenants.some(tenant => tenant.id === tenantId) ||
         userinfo.userinfo.tenantMemberships.some(membership =>
           membership.tenant.id === tenantId &&
           membership.role === "billing"
         );
}

/**
 * This function takes an authed request and returns the Stripe customer for the user.
 * If the customer doesn't exist, it will create it.
 */
async function getAuthorizedCustomer(c: Context) {
  const customer = await authorizeCustomer(c.req);
  if (!customer) {
    return {
      customer: null,
      errorResponse: c.json({ error: "Failed to create customer" }, 500),
    };
  }
  return { customer, errorResponse: null };
}

async function authorizeCustomer(req: Context["req"]) {
  const defangTenantId = getTenantIdFromHeader(req);

  if (!defangTenantId) {
    throw new Error("No tenant ID found in header");
  }

  const jwt = getJwtFromRequest(req);
  const userinfo = await fetchUserinfo(jwt!); // jwt is guaranteed to be defined here since we just checked it in authorizeRequest
  const hasPermission = userHasTenantBillingPermission(userinfo, defangTenantId);

  if (!hasPermission) {
    throw new Error("User does not have permission to access this tenant");
  }

  const email = userinfo.userinfo.email;
  const customer = await upsertStripeCustomer(defangTenantId, { email });

  return customer;
}

/**
 * [DEPRECATED]
 * This is used to create links for the authed user to manage their subscriptions
 * in the Stripe-managed pricing table.
 */
export async function createStripeClientSecret(c: Context) {
  const { customer, errorResponse } = await getAuthorizedCustomer(c);
  if (errorResponse) {
    return errorResponse;
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

/**
 * This is used to create links for the authed user to manage their subscriptions
 * in the Stripe-managed portal.
 */
export async function createStripePortalSession(c: Context) {
  const { customer, errorResponse } = await getAuthorizedCustomer(c);
  if (errorResponse) {
    return errorResponse;
  }

  const stripeClient = getStripeClient();

  const rootUrl = env<{
    PUBLIC_ROOT_URL: string | undefined;
  }>(c).PUBLIC_ROOT_URL;

  if (!rootUrl) {
    console.error("PUBLIC_ROOT_URL is not set in the environment variables.");
    return c.json({ message: "Misconfigured." }, 500);
  }

  const session = await stripeClient.billingPortal.sessions.create({
    customer: customer.id,
    return_url: process.env.PUBLIC_ROOT_URL + "/pricing",
  });

  return c.json({ url: session.url }, 201);
}

async function handleWebhookEventAnalytics(
  stripe: Stripe,
  event: Stripe.Event,
  getAnalyticsProperties: (object: any) => Record<string, any>
) {
  const eventObject = event.data.object as { customer?: string | Stripe.Customer | null };
  const customerId = typeof eventObject.customer === 'string' ? eventObject.customer : eventObject.customer?.id;

  if (!customerId) {
    throw new Error(`No customer ID found in event: ${event.id}`);
  }

  const customer = await stripe.customers.retrieve(customerId);

  if (customer.deleted) {
    console.info(`Customer ${customerId} is deleted. Skipping webhook event.`);
    return;
  }

  const { defangTenantId, defangUserId: initialDefangUserId } = customer.metadata;
  let defangUserId = initialDefangUserId;

  if (!defangUserId && defangTenantId) {
    const userResult = (await getUserIdForTenant(defangTenantId)).data.users[0]?.id;
    if (!userResult) {
      throw new Error(`No user found for tenant ID: ${defangTenantId}`);
    }
    defangUserId = userResult;
  }

  if (!defangUserId) {
    throw new Error(`Could not determine defangUserId for customer ${customerId}`);
  }

  analytics.identify({
    userId: defangUserId,
    traits: {
      email: customer.email,
      stripeCustomerId: customer.id,
    },
  });

  analytics.track({
    userId: defangUserId,
    event: `stripe.${event.type}`,
    properties: {
      customerId: customer.id,
      ...getAnalyticsProperties(event.data.object),
    },
  });
}

/**
 * This is used to handle webhooks from Stripe.
 */
export async function webhookHandler(c: Context) {
  const { STRIPE_WEBHOOK_SECRET } = env<{
    STRIPE_WEBHOOK_SECRET: string | undefined;
  }>(c);

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error(
      "STRIPE_WEBHOOK_SECRET is not set in the environment variables."
    );
    return c.json({ message: "Misconfigured." }, 500);
  }

  const signature = c.req.header("stripe-signature");
  const stripe = getStripeClient();

  if (!signature) {
    return c.json({ message: "Missing signature" }, 400);
  }

  try {
    const body = await c.req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );

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
        await handleWebhookEventAnalytics(stripe, event, (subscription: Stripe.Subscription) => ({
          subscriptionId: subscription.id,
          status: subscription.status,
          priceId: subscription.items.data[0]?.price?.id,
          priceName: subscription.items.data[0]?.price?.nickname,
          productId: subscription.items.data[0]?.price?.product,
        }));
        break;

      case 'payment_intent.succeeded':
        await handleWebhookEventAnalytics(stripe, event, (paymentIntent: Stripe.PaymentIntent) => ({
          paymentIntentId: paymentIntent.id,
          revenue: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
        }));
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ message: "Event received" }, 200);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err);
    return c.json({ message: "Webhook Error" }, 400);
  }
}

/**
 * This is used to generate a checkout link for the authed user.
 * Used in the pricing page in the Defang portal for users who
 * do not have a subscription yet. (replaces createStripeClientSecret)
 */
export async function generateCheckoutLink(c: Context) {
  const { customer, errorResponse } = await getAuthorizedCustomer(c);
  if (errorResponse) {
    return errorResponse;
  }

  const stripeClient = getStripeClient();

  const rootUrl = env<{
    PUBLIC_ROOT_URL: string | undefined;
  }>(c).PUBLIC_ROOT_URL;

  if (!rootUrl) {
    console.error("PUBLIC_ROOT_URL is not set in the environment variables.");
    return c.json({ message: "Misconfigured." }, 500);
  }

  // get price ID from request json
  const json = await c.req.json();
  const priceId = json?.input?.input?.priceId;

  if (!priceId || typeof priceId !== "string") {
    return c.json({ message: "Invalid request" }, 400);
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
