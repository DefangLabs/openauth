import { graphql } from "@/generated/graphql";

export const insertUserMutation = graphql(`
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
