import * as grpc from "@grpc/grpc-js";
import { Request, Response } from "express";
import * as fabric from "../../../lib/io/defang/v1/fabric_grpc_pb";
import { TokenRequest } from "../../../lib/io/defang/v1/fabric_pb";

const getHeimdallJWT = async (req: Request) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const authHeaderParts = authHeader.split(' ');
        if (authHeaderParts.length === 2) {
            return authHeaderParts[1];
        }
    }
}

const getUnauthedClient = async () => {
    let defaultFabric = process.env["DEFANG_FABRIC"] || "fabric-prod1.defang.dev:443";
    return new fabric.FabricControllerClient(
        defaultFabric,
        grpc.credentials.combineChannelCredentials(
            grpc.credentials.createSsl(),
            grpc.credentials.createFromMetadataGenerator((_, callback) => {
                const metadata = new grpc.Metadata();
                callback(null, metadata);
            })
        )
    );
}


export const getDefangToken = async (req: Request, res: Response) => {
    let token: string | undefined;
    const heimdallJWT = await getHeimdallJWT(req);
    if (heimdallJWT) {
        const client = await getUnauthedClient();
        const tokenRequest = new TokenRequest();
        tokenRequest.setAssertion(heimdallJWT);
        token = await new Promise((resolve, reject) => {
            client.token(tokenRequest, (err, response) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response?.toString() || undefined);
                }
            });
        });
    }
    
    res.status(201).json({ token })
}