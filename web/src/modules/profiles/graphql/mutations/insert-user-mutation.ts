import { graphql } from "@/generated/graphql";

export const InsertUserMutation = graphql(`
  mutation InsertUserMutation($object: UsersInsertInput!) {
    user: insertUsersOne(
      object: $object
      onConflict: { constraint: profiles_pkey, updateColumns: [name] }
    ) {
      id
      name
    }
  }
`);
