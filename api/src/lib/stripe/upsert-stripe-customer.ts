import Stripe from "stripe";
import { getStripeClient } from "./get-stripe-client";
import { getStripeCustomer } from "./get-stripe-customer";

export type CreateStripeCustomerOptions = Stripe.CustomerCreateParams;

/**
 * Creates or updates a Stripe customer tied to a tenant.
 *
 * If a customer already exists for the tenant the metadata is updated to ensure
 * `defangTenantId` is set and the legacy `defangUserId` field is removed. If no
 * customer exists a new record is created. Email is only required when creating
 * the customer for the first time.
 */
export async function upsertStripeCustomer(
  defangTenantId: string,
  args: CreateStripeCustomerOptions = {},
): Promise<Stripe.Customer> {
  const stripe = getStripeClient();

  const existingCustomer = await getStripeCustomer(defangTenantId);

  if (existingCustomer) {
    const email = args.email ?? existingCustomer.email ?? undefined;
    return stripe.customers.update(
      existingCustomer.id,
      {
        ...args,
        email,
        metadata: {
          ...args.metadata,
          defangTenantId,
          // remove the legacy metadata key
          defangUserId: null,
        },
      },
    );
  }

  if (!args.email) {
    throw new Error("Email is required to create a Stripe customer");
  }

  return stripe.customers.create(
    {
      description: `Customer for Defang tenant ${defangTenantId}`,
      ...args,
      metadata: {
        ...args.metadata,
        defangTenantId,
      },
    },
    {
      idempotencyKey: `idem4_${defangTenantId}`,
    },
  );
}
