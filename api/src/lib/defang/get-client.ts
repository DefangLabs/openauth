import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from '@connectrpc/connect-node';
import { FabricController } from "./generated/fabric_pb";

let defaultFabricBaseUrl = process.env["DEFANG_FABRIC"] || "https://fabric-prod1.defang.dev";

export const getClient = (token?: string) => {
    const transport = createConnectTransport({
        baseUrl: defaultFabricBaseUrl,
        httpVersion: '2',
        interceptors: [
            (next) => async (req) => {
                if (token) {
                    req.header.append('authorization', `Bearer ${token}`);
                }
                return await next(req);
            }
        ]
    })

    const client = createClient(
        FabricController,
        transport,
    )

    return client;
}

