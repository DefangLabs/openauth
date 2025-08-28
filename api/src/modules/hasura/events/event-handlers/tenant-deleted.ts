/**
 * Tenant deletion handler triggered by Hasura.
 *
 * When a tenant row is removed from Postgres Hasura sends a delete event
 * to the API. This file contains the handler that performs the external
 * clean up tasks required when a tenant is deleted. Currently that means
 * cancelling any active Stripe subscriptions for the tenant and removing
 * the Stripe customer record so we do not retain personal information.
 *
 * The handler intentionally performs only the minimal side effects needed
 * to keep third party services in sync. All heavy business logic such as
 * authorization and cascading deletes should be handled by the database
 * and Hasura layer so this function can remain small and easy to reason
 * about.
 */
import { Context } from "hono";
import { HasuraEvent } from "../../../../lib/hasura/hasura-event-schema";
import { getStripeCustomer } from "../../../../lib/stripe/get-stripe-customer";
import { getStripeClient } from "../../../../lib/stripe/get-stripe-client";

export async function tenantDeleted(event: HasuraEvent, _c: Context) {
  const tenantId = event.event.data.old.id;

  if (!tenantId) {
    throw new Error("Tenant id not found");
  }

  const customer = await getStripeCustomer(tenantId);
  if (!customer) {
    return;
  }

  const stripe = getStripeClient();

  // Cancel all subscriptions associated with the customer. This ensures
  // billing stops immediately and the customer can be deleted without
  // leaving dangling subscriptions.
  const subs = await stripe.subscriptions.list({ customer: customer.id, status: 'all' });
  for (const sub of subs.data) {
    await stripe.subscriptions.cancel(sub.id);
  }

  // Remove the customer entirely to avoid retaining personal data.
  await stripe.customers.del(customer.id)
}
