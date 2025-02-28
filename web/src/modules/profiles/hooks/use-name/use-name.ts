import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { userQuery } from "../../graphql/queries/user-query";

export function useName() {
  const id = useAccessToken()?.claims?.properties?.id;
  const { data, refetch } = useQuery(userQuery, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (id) {
      refetch({ id });
    }
  }, [id, refetch]);

  const profileName = data?.user?.name;

  if (profileName) return profileName;

  return "Defang User";
}
