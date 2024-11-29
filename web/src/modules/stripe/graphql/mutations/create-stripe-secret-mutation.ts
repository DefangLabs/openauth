import { graphql } from "@/generated/graphql";

export const CreateStripeSecretMutation = graphql(`
  mutation CreateStripeSecret {
    createStripeSecret {
      secret
    }
  }
`);
