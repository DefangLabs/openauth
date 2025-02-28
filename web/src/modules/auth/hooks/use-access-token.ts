import { useCallback } from "react";
import useSWR from "swr";
import { getAccessTokenAction } from "../actions/actions";

export function useAccessToken(
  ...options: Parameters<typeof getAccessTokenAction>
) {
  const fetcher = useCallback(async () => {
    return await getAccessTokenAction(...options);
  }, [options]);
  const { data, mutate, ...rest } = useSWR("auth/access-token", fetcher);

  return {
    token: data?.token,
    claims: data?.claims,
    refetch: mutate,
    ...rest,
  };
}
