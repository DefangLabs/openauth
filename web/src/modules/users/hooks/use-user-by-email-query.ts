/**
 * React hook wrapping the `userByEmailQuery` document.
 *
 * This uses `useLazyQuery` so callers can trigger the fetch on demand
 * (e.g. after the invite form is submitted).
 */
import { useLazyQuery } from "@apollo/client";
import {
  userByEmailQuery,
  UserByEmailQuery,
  UserByEmailQueryVariables,
} from "../graphql/user-by-email-query";

export function useUserByEmailQuery() {
  return useLazyQuery<UserByEmailQuery, UserByEmailQueryVariables>(
    userByEmailQuery,
  );
}
