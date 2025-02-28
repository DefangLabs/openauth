import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS = createRemoteJWKSet(new URL(process.env.AUTH_ENDPOINT! + '/.well-known/jwks.json'));

export async function validateJwt(token: string) {
  const { payload } = await jwtVerify(token, JWKS);
  return payload;
}