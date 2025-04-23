import { graphql } from "@/generated/graphql";

export const CreateStripeCheckoutSessionMutation = graphql(`
  mutation CreateStripeCheckoutSession($priceId: String!) {
    createStripeCheckoutSession(input: { priceId: $priceId }) {
      url
    }
  }
`);
