import Stripe from "stripe";
import { getStripeClient } from "./get-stripe-client";
import { getStripeCustomer } from "./get-stripe-customer";

export type CreateStripeCustomerOptions = Stripe.CustomerCreateParams;

export async function upsertStripeCustomer(
  defangUserId: string,
  args?: CreateStripeCustomerOptions, // same shape for create/update
): Promise<Stripe.Customer> {
  const email = args?.email;
  if(!email) {
    throw new Error("Email is required to create a Stripe customer");
  }

  const stripe = getStripeClient();

  const existingCustomer = await getStripeCustomer(defangUserId);

  if (existingCustomer) {
    return await stripe.customers.update(existingCustomer.id, {
      ...args,
      email,
      metadata: {
        ...args?.metadata,
        defangUserId,
      },
    }, {
      idempotencyKey: `idem_update_${defangUserId}`,
    });
  }

  return await stripe.customers.create({
    description: `Customer for Defang user ${defangUserId}`,
    ...args,
    metadata: {
      ...args?.metadata,
      defangUserId,
    },
  }, {
    idempotencyKey: `idem3_${defangUserId}`,
  });
}
