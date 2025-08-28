import { useCallback } from "react";
import useSWR from "swr";
import { getAccessTokenAction } from "../actions/actions";
import { refreshAccessTokenAction } from "../actions/actions";

export function useAccessToken(
  ...options: Parameters<typeof getAccessTokenAction>
) {
  const fetcher = useCallback(async () => {
    return await getAccessTokenAction(...options);
  }, [options]);
  const cacheKey = ["auth/access-token", JSON.stringify(options)];
  const { data, mutate, ...rest } = useSWR(cacheKey, fetcher);

  const refresh = useCallback(async () => {
    const refreshed = await refreshAccessTokenAction();
    if (refreshed) {
      mutate(refreshed);
    }
    return refreshed;
  }, [mutate]);

  return {
    token: data?.token,
    claims: data?.claims,
    refetch: mutate,
    refresh,
    ...rest,
  };
}
