import { graphql } from "@/generated/graphql";

export const DeleteAccountMutation = graphql(`
  mutation DeleteAccountMutation {
    deleteAccount {
      message
    }
  }
`);
