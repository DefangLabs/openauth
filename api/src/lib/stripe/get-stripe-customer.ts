import Stripe from "stripe";
import { getStripeClient } from "./get-stripe-client";

export async function getStripeCustomer(
  defangId: string
): Promise<Stripe.Customer | null> {
  const stripe = getStripeClient();
  const res = await stripe.customers.search({
    limit: 1,
    query: `metadata["defangUserId"]:"${defangId}" OR metadata["defangTenantId"]:"${defangId}"`,
  });

  // We should only return non-deleted customers.
  const customer = res.data.find((c) => !c.deleted);
  if (customer) {
    return customer;
  }

  return null;
}
