import jwt from 'jsonwebtoken';
import JwksClient from 'jwks-rsa';

const JWKS_ENDPOINT = (process.env as any).JWKS_ENDPOINT;

const jwksClient = JwksClient({
    jwksUri: JWKS_ENDPOINT,
    cache: true,
    cacheMaxAge: 1000 * 60 * 60,
});

async function getKey(header: any): Promise<string> {
    return new Promise((resolve, reject) => {
        jwksClient.getSigningKey(header.kid, (err, key) => {
            if (err || !key) {
                return reject(err);
            }
            const signingKey = key.getPublicKey();
            resolve(signingKey);
        });
    });
}

/**
 * Takes a token and validates it using the JWKS endpoint. Throws an error if invalid.
 * 
 * @param token 
 * @returns 
 */
export async function validateJwt(token: string) {
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, async (header, callback) => {
                try {
                    const key = await getKey(header);
                    callback(null, key);
                } catch (err) {
                    callback(err as Error);
                }
            }, {}, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
        return decoded;
    } catch (err) {
        throw err;
    }
}