import { Context } from "hono";
import { getJwtFromRequest } from "./get-jwt-from-request";
import { jwtSchema } from "./jwt-schema";
import { validateJwt } from "./validate-jwt";

/**
 * Takes a request to this api and authorizes it. Throws an error if unauthorized.
 *
 * @param req
 */
export async function authorizeRequest(req: Context["req"]) {
  const jwt = getJwtFromRequest(req);

  if (!jwt) {
    throw new Error("No JWT found in request");
  }
  const decoded = await validateJwt(jwt);

  const decodedJwt = jwtSchema.safeParse(decoded);

  if (!decodedJwt.success) {
    console.error("Invalid JWT", decoded);
    throw new Error("Invalid JWT");
  }

  const subject = decodedJwt.data.sub;

  if (!subject) {
    throw new Error("No subject found in JWT");
  }

  return decoded;
}
