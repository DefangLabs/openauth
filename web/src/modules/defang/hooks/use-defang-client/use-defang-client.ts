import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { createCallbackClient } from "@bufbuild/connect";
import { createGrpcWebTransport } from "@bufbuild/connect-web";
import { useMemo, useRef } from "react";
import { FabricController } from "../../generated/fabric_connect";
import { mockClient } from "./mock-client";

type Client =
  | ReturnType<typeof createCallbackClient<typeof FabricController>>
  | undefined;

export function useDefangClient() {
  const { token, refetch } = useAccessToken();
  const tokenRef = useRef(token);
  const clientRef = useRef<Client>();

  const memoClient = useMemo(() => {
    if (
      process.env.NODE_ENV === "development" &&
      !process.env.NEXT_PUBLIC_FABRIC
    ) {
      return mockClient as Client;
    }

    if (clientRef.current) {
      return clientRef.current;
    } else {
      const fabricEndpoint = process.env.NEXT_PUBLIC_FABRIC as string;
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
  }, [refetch]);

  const returnClient = token ? memoClient : undefined;

  return returnClient;
}
