import * as fabric from "../../lib/fabric/v1/fabric_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import { Void } from "../../lib/fabric/v1/fabric_pb";
import { Request, Response } from "express";

const getToken = async () => {
    const token = undefined; // eventually we will get token from defang
    return process.env["DEFANG_TOKEN"] || ''; // for now we will use a static token
}

const getClient = async () => {
    let defaultFabric = process.env["DEFANG_FABRIC"] || "fabric-prod1.defang.dev:443";
    const token = await getToken();
    return new fabric.FabricControllerClient(
        defaultFabric,
        grpc.credentials.combineChannelCredentials(
            grpc.credentials.createSsl(),
            grpc.credentials.createFromMetadataGenerator((_, callback) => {
                const metadata = new grpc.Metadata();
                metadata.set("authorization", "Bearer " + token);
                callback(null, metadata);
            })
        )
    );
}

export async function getServices(req: Request, res: Response) {
    const client = await getClient();
    client.getServices(new Void, (err, response) => {
        console.log(response);
        res.send(response?.toObject() || {});
    });
}

export async function getService(req: Request, res: Response) {
    const id = req.params.serviceId;
    const client = await getClient();
    client.getServices(new Void, (err, response) => {
        console.log(response);
        const service = response?.toObject().servicesList.find(service => service.etag === id);
        if (service) {
            res.send(service);
        }
        else {
            res.status(404).send();
        }
    });
}