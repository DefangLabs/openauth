import { Context } from "hono";
import { validateToken } from "./validate-token";


/**
 * Takes a request context and validates the Authorization header. Returns the claims if the token is valid.
 */
export async function authorizeRequest(c: Context) {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
        return {
            error: 'No Authorization header',
        }
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer') {
        return {
            error: 'Invalid Authorization header',
        }
    }
    const {claims, error} = await validateToken(token);
    if (error) {
        return {
            error: 'Invalid token',
        }
    }
    return {
        claims,
    };
}