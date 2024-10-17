import { Request, Response } from "express";
import { getClient } from '@/lib/defang/get-client';
import { TokenRequestSchema } from '@/lib/defang/generated/fabric_pb';
import { getJwtFromRequest } from '@/lib/auth/get-jwt-from-request'
import { create } from "@bufbuild/protobuf";



export const getDefangToken = async (req: Request, res: Response) => {
    const heimdallJWT = await getJwtFromRequest(req);

    if (!heimdallJWT) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = getClient();

    const tokenRequest = create(TokenRequestSchema, {
        assertion: heimdallJWT,
        scope: ["tail", "read", "delete"],
    });

    try {
        const response = await client.token(tokenRequest);
        return res.status(201).json({ token: response?.accessToken });
    }
    catch (e) {
        console.log('@@ err: ', e);
        return res.status(500).json({ error: e });
    }
}