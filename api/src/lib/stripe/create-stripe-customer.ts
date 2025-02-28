import Stripe from "stripe";
import { getStripeClient } from "./get-stripe-client";

export type CreateStripeCustomerOptions = Stripe.CustomerCreateParams;

export async function createStripeCustomer(
  defangUserId: string,
  args?: CreateStripeCustomerOptions,
) {
  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    description: `Customer for Defang user ${defangUserId}`,
    ...args,
    metadata: {
      ...args?.metadata,
      defangUserId,
    },
  }, {
    idempotencyKey: `idem3_${defangUserId}`,
  });
  return customer;
}
