import Stripe from "stripe";

export function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
  });
}
