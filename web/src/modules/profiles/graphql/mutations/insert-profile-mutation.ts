import { graphql } from "@/generated/graphql";

export const InsertProfileMutation = graphql(`
  mutation InsertProfileMutation($object: ProfilesInsertInput!) {
    insertProfilesOne(
      object: $object
      onConflict: { constraint: profiles_pkey, updateColumns: [name] }
    ) {
      id
      name
    }
  }
`);
