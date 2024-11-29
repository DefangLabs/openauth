import { create } from "@bufbuild/protobuf";
import { Request } from "express";
import { getJwtFromRequest } from '../auth/get-jwt-from-request';
import { TokenRequestSchema } from './generated/fabric_pb';
import { getClient } from './get-client';



export async function getDefangTokenFromRequest(req: Request) {
    const heimdallJWT = getJwtFromRequest(req);

    const client = getClient();

    const tokenRequest = create(TokenRequestSchema, {
        assertion: heimdallJWT,
        scope: ["tail", "read", "delete"],
    });

    const response = await client.token(tokenRequest);

    return response?.accessToken;
}