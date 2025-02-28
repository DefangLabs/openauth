import { Context } from "hono";

export function getJwtFromRequest(req: Context['req']) {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const authHeaderParts = authHeader.split(' ');
        if (authHeaderParts.length === 2) {
            return authHeaderParts[1];
        }
    }
}