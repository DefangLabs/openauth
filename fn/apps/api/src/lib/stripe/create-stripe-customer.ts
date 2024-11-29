import { getStripeClient } from "./get-stripe-client";

export async function createStripeCustomer(
  defangUserId: string,
  email?: string
) {
  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    description: `Customer for Defang user ${defangUserId}`,
    email,
    metadata: {
      defangUserId,
    },
  }, {
    idempotencyKey: `idem3_${defangUserId}`,
  });
  return customer;
}
