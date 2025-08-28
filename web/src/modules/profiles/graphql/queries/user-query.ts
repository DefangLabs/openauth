import { graphql } from "@/generated/graphql";

export const UserQuery = graphql(`
  query UserQuery($id: uuid!) {
    user: usersByPk(id: $id) {
      id
      name
      email
    }
  }
`);
