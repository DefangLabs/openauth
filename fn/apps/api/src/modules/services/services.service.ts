import * as fabric from "../../lib/fabric/v1/fabric_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import { Void } from "../../lib/fabric/v1/fabric_pb";
import { Request, Response } from "express";

const getClient = () => {
    let defaultFabric = process.env["DEFANG_FABRIC"] || "fabric-prod1.defang.dev:443";
    return new fabric.FabricControllerClient(
        defaultFabric,
        grpc.credentials.combineChannelCredentials(
            grpc.credentials.createSsl(),
            grpc.credentials.createFromMetadataGenerator((_, callback) => {
                const metadata = new grpc.Metadata();
                // TODO: automatically generate a new token once it expires
                metadata.set("authorization", "Bearer " + 'eyJhbGciOiJFUzI1NiIsImtpZCI6Ijg3OGFiY2EzLWRhMDUtNDJmNi1iN2M4LTY3ZmYzNzQ1YzhjNyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2ZhYnJpYy5kZWZhbmcuaW8vIiwic3ViIjoicmFwaGFlbHRtIiwiZXhwIjoxNjg4NjA2ODY1fQ.03WBAoEkV8ZPM9Wn3j_bFp3jt_N5TGrGOm7vJNYMZslUCD7F3xbS4pHzJm25o4KsF7pXOxJxpzUIujfC17ljPw');
                callback(null, metadata);
            })
        )
    );
}

export function getServices(req: Request, res: Response) {
    const client = getClient();
    client.getServices(new Void, (err, response) => {
        console.log(response);
        res.send(response?.toObject() || {});
    });
}