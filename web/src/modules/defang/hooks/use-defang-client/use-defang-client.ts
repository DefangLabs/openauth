import { createCallbackClient } from "@bufbuild/connect";
import { createGrpcWebTransport } from "@bufbuild/connect-web";
import { atom, useAtom } from "jotai";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import { useEffect, useMemo } from "react";
import { FabricController } from "../../generated/fabric_connect";
import { useTokenRequest } from "../use-token-request/use-token-request";

let _token: string | undefined;
type Client =
  | ReturnType<typeof createCallbackClient<typeof FabricController>>
  | undefined;

const tokenAtom = atom<typeof _token>(_token);
const setTokenAtom = atom(null, (get, set, token: typeof _token) => {
  set(tokenAtom, token);
  _token = token;
});
const clientAtom = atom<Client>(undefined);

function useAuthToken() {
  const tokenRequest = useTokenRequest();
  const [token] = useAtom(tokenAtom);
  const [, setToken] = useAtom(setTokenAtom);

  useEffect(() => {
    if (!tokenRequest?.data?.token || tokenRequest.isLoading) {
      return;
    }
    (window as any).token = token;
    setToken(tokenRequest.data.token);
  }, [setToken, token, tokenRequest.data, tokenRequest.isLoading]);

  if (!token) return;

  const decoded = jwtDecode<JwtHeader & JwtPayload>(token);

  // check if expired
  if ((decoded?.exp || 0) * 1000 < Date.now()) {
    setToken(undefined);
    return;
  }

  return token;
}

function useClient() {
  const [client, setClient] = useAtom(clientAtom);
  const token = useAuthToken();

  const memoClient = useMemo(() => {
    if (client) {
      return client;
    } else {
      const fabricEndpoint = process.env.NEXT_PUBLIC_FABRIC as string;
      const transport = createGrpcWebTransport({
        baseUrl: fabricEndpoint,
        interceptors: [
          (next) => async (req) => {
            req.header.append("authorization", "Bearer " + _token);
            return await next(req);
          },
        ],
        useBinaryFormat: false,
      });
      const createdClient = createCallbackClient(FabricController, transport);
      setClient(createdClient);
      if (typeof window !== "undefined") {
        (window as any).fabricEndpoint = fabricEndpoint;
        (window as any).FabricController = FabricController;
        (window as any).createGrpcWebTransport = createGrpcWebTransport;
        (window as any).createCallbackClient = createCallbackClient;
      }
      return createdClient;
    }
  }, [client, setClient]);

  const returnClient = token ? memoClient : undefined;

  return returnClient;
}

export function useDefangClient() {
  return useClient();
}
