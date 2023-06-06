import { graphql } from "@/generated/graphql";

export const ProfileQuery = graphql(`
  query ProfileQuery($id: uuid!) {
    profilesByPk(id: $id) {
      id
      name
    }
  }
`);
