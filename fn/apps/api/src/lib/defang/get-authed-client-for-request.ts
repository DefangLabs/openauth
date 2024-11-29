import { Request } from 'express';
import { getClient } from "./get-client";
import { getDefangTokenFromRequest } from './get-defang-token-from-request';

export async function getAuthedClientForRequest(req: Request) {
    const defangToken = await getDefangTokenFromRequest(req);
    if(!defangToken) {
        throw new Error('Failed to get defang token');
    }
    return getClient(defangToken);
}