import { graphql } from "@/generated/graphql";

export const CreateStripePortalSessionMutation = graphql(`
  mutation CreateStripePortalSession {
    createStripePortalSession {
      url
    }
  }
`);
