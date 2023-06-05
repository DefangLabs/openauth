import { graphql } from "@/generated/graphql";
import { useQuery } from "@apollo/client";

export const UserProfileQuery = graphql(`
  query UserProfileQuery($id: uuid!) {
    profilesByPk(id: $id) {
      id
      name
    }
  }
`);

export function useUserProfileQuery({ id }: { id?: string }) {
  return useQuery(UserProfileQuery, {
    variables: {
      id,
    },
    skip: !id,
  });
}
