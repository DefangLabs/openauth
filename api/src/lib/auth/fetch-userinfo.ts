import { Context } from "hono";
import { authEndpoint } from "./auth-client";
import { getJwtFromRequest } from "./get-jwt-from-request";
import { userinfoSchema, type UserinfoResponse } from "./userinfo-schema";

/**
 * Takes a request to this api and authorizes it. Throws an error if unauthorized.
 *
 * @param req
 */
export async function fetchUserinfo(jwt: string) {
  const response = await fetch(`${authEndpoint}/userinfo`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch userinfo: ${response.statusText}`);
  }

  const data = await response.json();
  const userinfo = userinfoSchema.parse(data);

  return userinfo;
}
