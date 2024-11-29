import { Request } from "express";
import { getJwtFromRequest } from "./get-jwt-from-request";
import { validateJwt } from "./validate-jwt";
import { heimdallJwtSchema } from "./heimdall-jwt-schema";

/**
 * Takes a request to this api and authorizes it. Throws an error if unauthorized.
 *
 * @param req
 */
export async function authorizeRequest(req: Request) {
  const jwt = getJwtFromRequest(req);

  if (!jwt) {
    throw new Error("No JWT found in request");
  }
  const decoded = await validateJwt(jwt);

  const decodedJwt = heimdallJwtSchema.safeParse(decoded);

  if (!decodedJwt.success) {
    console.error("Invalid JWT", decoded);
    throw new Error("Invalid JWT");
  }

  const subject = decodedJwt.data.sub;

  if (!subject) {
    throw new Error("No subject found in JWT");
  }

  return decodedJwt.data;
}
