import { graphql } from "@/generated/graphql";
import { useMutation } from "@apollo/client";

export const InsertUserProfileMutation = graphql(`
  mutation InsertUserProfileMutation($object: ProfilesInsertInput!) {
    insertProfilesOne(object: $object) {
      id
      name
    }
  }
`);

export function useInsertUserProfileMutation() {
  return useMutation(InsertUserProfileMutation);
}
