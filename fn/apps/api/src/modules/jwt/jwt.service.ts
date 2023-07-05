import { Request, Response } from 'express';

export function getJwt (req: Request, res: Response) {
    // check if we have an authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.error(`Did you set the authorization header?`)
        res.status(401).send({ error: 'No authorization header found' });
        return;
    }

    // check if the authorization header is a bearer token
    const authHeaderParts = authHeader.split(' ');
    if (authHeaderParts.length !== 2) {
        res.status(401).send({ error: 'No bearer token found' });
        return;
    }

    // return the token
    const token = authHeaderParts[1];
    res.send({ token });
}