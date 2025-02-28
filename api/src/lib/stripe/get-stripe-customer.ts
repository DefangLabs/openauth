import { getStripeClient } from "./get-stripe-client";

export async function getStripeCustomer(
  defangUserId: string,
) {
  const stripe = getStripeClient();

  const customers = await stripe.customers.search({
    limit: 1,
    query: `metadata["defangUserId"]:"${defangUserId}"`,
  })

  if (customers.data.length === 0) {
    return null;
  }

  return customers.data[0];
}
