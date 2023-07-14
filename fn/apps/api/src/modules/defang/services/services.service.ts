import * as fabric from "../../../lib/io/defang/v1/fabric_grpc_pb";
import * as grpc from "@grpc/grpc-js";
import { ServiceID, TokenRequest } from "../../../lib/io/defang/v1/fabric_pb";
import { Request, Response } from "express";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import { WebsocketRequestHandler } from 'express-ws';

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


const getDefangToken = async (req: Request) => {
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
    return token ? token : process.env["DEFANG_TOKEN"];
}

const getClient = async (req: Request) => {
    let defaultFabric = process.env["DEFANG_FABRIC"] || "fabric-prod1.defang.dev:443";
    const defangToken = await getDefangToken(req);
    return new fabric.FabricControllerClient(
        defaultFabric,
        grpc.credentials.combineChannelCredentials(
            grpc.credentials.createSsl(),
            grpc.credentials.createFromMetadataGenerator((_, callback) => {
                const metadata = new grpc.Metadata();
                metadata.set("authorization", "Bearer " + defangToken);
                callback(null, metadata);
            })
        )
    );
}

export async function getServices(req: Request, res: Response) {
    const client = await getClient(req);
    client.getServices(new google_protobuf_empty_pb.Empty, (err, response) => {
        res.send(response?.toObject() || {});
    });
}

export async function getService(req: Request, res: Response) {
    const name = req.params.serviceName;
    const client = await getClient(req);
    client.getServices(new google_protobuf_empty_pb.Empty, (err, response) => {
        const service = response?.toObject().servicesList.find((service) => service.service?.name === name);
        if (service) {
            res.send(service);
        }
        else {
            res.status(404).send();
        }
    });
}

export const getServiceLogs: WebsocketRequestHandler = async (ws, req) => {
    console.log('@@ test');
    const name = req.params.serviceName;
    // const client = await getClient(req);
    const serviceId = new ServiceID(); 
    serviceId.setName(name);
    ws.onmessage = (msg) => {
        console.log('@@ Message: ', msg);
    };
    if(ws.OPEN){
        ws.send("Connected");
    }
    ws.onerror = (err) => {
        console.log('@@ Error: ', err);
    }; 
    // const stream = client.tail(serviceId);
    // ws.on("message", (msg) => {
    //     console.log('@@ Message: ', msg);
    // });
    // ws.send("Connected");
    // stream.on("data", (data) => {
    //     const log = data.toObject();
    //     console.log('@@ Log: ', log);
    //     ws.send(JSON.stringify(log));
    // });
    // req.on("close", () => {
    //     ws.send("Goodbye");
    // })
}