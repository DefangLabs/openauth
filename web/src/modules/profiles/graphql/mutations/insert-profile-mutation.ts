import { graphql } from "@/generated/graphql";

export const InsertProfileMutation = graphql(`
  mutation InsertProfileMutation($object: ProfilesInsertInput!) {
    insertProfilesOne(object: $object) {
      id
      name
    }
  }
`);
