import useSWR from "swr";
import { fetcher } from "../../lib/fetcher/fetcher";

interface TokenRequestResponse {
  token: string;
}

interface TokenRequestOpts {
  swrOpts?: Parameters<typeof useSWR<TokenRequestResponse>>[2];
}

export function useTokenRequest(opts: TokenRequestOpts = {}) {
  const { swrOpts } = opts;
  return useSWR<TokenRequestResponse>("defang/auth/token", fetcher, swrOpts);
}
