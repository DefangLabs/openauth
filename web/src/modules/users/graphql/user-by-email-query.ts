/**
 * Query to fetch a single user record by email.
 *
 * The resulting document can be used with Apollo's `useLazyQuery` to resolve
 * the userId needed when inviting members to a tenant.  Only a subset of
 * fields are returned to keep the response small.
 */
import { graphql } from "@/generated/graphql";

export interface UserByEmailQuery {
  users: { id: string; email: string; name: string | null }[];
}

export interface UserByEmailQueryVariables {
  email: string;
}

export const userByEmailQuery = graphql(`
  query UserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
      name
    }
  }
`);
