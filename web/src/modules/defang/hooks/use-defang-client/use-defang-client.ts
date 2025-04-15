import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { createCallbackClient } from "@bufbuild/connect";
import { createGrpcWebTransport } from "@bufbuild/connect-web";
import { useMemo, useRef, useEffect } from "react";
import { FabricController } from "../../generated/fabric_connect";
import { mockClient } from "./mock-client";

type Client =
  | ReturnType<typeof createCallbackClient<typeof FabricController>>
  | undefined;

export function useDefangClient() {
  const { token, refetch } = useAccessToken();
  const tokenRef = useRef(token);
  const clientRef = useRef<Client>();

  // Update tokenRef whenever token changes
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const memoClient = useMemo(() => {
    if (process.env.NODE_ENV === "development") {
      return mockClient as Client;
    }

    if (clientRef.current) {
      return clientRef.current;
    } else {
      const fabricEndpoint = process.env.NEXT_PUBLIC_FABRIC;

      if (!fabricEndpoint) {
        console.error("NEXT_PUBLIC_FABRIC environment variable is not defined");
        return undefined;
      }

      const transport = createGrpcWebTransport({
        baseUrl: fabricEndpoint,
        interceptors: [
          (next) => async (req) => {
            req.header.append("authorization", "Bearer " + tokenRef.current);
            return await next(req).catch((err) => {
              if (err.code === 16) {
                refetch();
              }
              throw err;
            });
          },
        ],
        useBinaryFormat: false,
      });

      const createdClient = createCallbackClient(FabricController, transport);
      clientRef.current = createdClient;
      return createdClient;
    }
  }, [refetch]); // Keep only refetch as dependency to maintain stable client reference

  const returnClient = token ? memoClient : undefined;

  return returnClient;
}
