import { Request } from 'express';

export function getJwtFromRequest(req: Request) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const authHeaderParts = authHeader.split(' ');
        if (authHeaderParts.length === 2) {
            return authHeaderParts[1];
        }
    }
}