import { Context } from "hono";
import { getJwtFromRequest } from "../auth/get-jwt-from-request";
import { getClient } from "./get-client";

/**
 * Used to fetch a fabric token in exchange for a Heimdall token.
 * Now we just send the JWT from OpenAuth.
 * 
 * @param req 
 * @returns 
 */
export async function getAuthedClientForRequest(req: Context['req']) {
    const defangToken = getJwtFromRequest(req);
    if(!defangToken) {
        throw new Error('Failed to get defang token');
    }
    return getClient(defangToken);
}