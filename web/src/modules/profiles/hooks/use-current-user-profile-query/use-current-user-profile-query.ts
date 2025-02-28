import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { useQuery } from "@apollo/client";
import { userQuery } from "../../graphql/queries/user-query";

export function useCurrentUserProfileQuery() {
  const id = useAccessToken()?.claims?.properties?.id;

  return useQuery(userQuery, {
    variables: { id },
    skip: !id,
  });
}
