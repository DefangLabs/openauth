import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { useQuery } from "@apollo/client";
import { UserQuery } from "../../graphql/queries/user-query";

export function useCurrentUserProfileQuery() {
  const id = useAccessToken()?.claims?.properties?.id;

  return useQuery(UserQuery, {
    variables: { id },
    skip: !id,
  });
}
