import { createLocalJWKSet, JSONWebKeySet, jwtVerify } from "jose";
import { issuerRouter } from "../issuer/router";

async function getJwks() {
    const res = await issuerRouter.request('/.well-known/jwks.json');
    return await res.json();
}

export async function validateToken(token: string) {
    const jwks = (await getJwks()) as JSONWebKeySet;
    const JWKS = createLocalJWKSet(jwks);
    try {
        const { payload } = await jwtVerify(token, JWKS);
        return {
            claims: payload,
            error: null,
        };
    } catch (e) {
        return {
            claims: null,
            error: e,
        };
    }
}