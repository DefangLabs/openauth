// GraphQL mutation for deleting the currently authenticated user

import { graphql } from "@/generated/graphql";

export const DeleteUserMutation = graphql(`
  mutation DeleteUserMutation {
    deleteUser {
      message
    }
  }
`);
