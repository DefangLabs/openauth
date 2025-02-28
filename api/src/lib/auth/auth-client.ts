import { createClient } from "@openauthjs/openauth/client";
import assert from "assert";

assert(process.env.AUTH_ENDPOINT, "AUTH_ENDPOINT must be set");

export const authEndpoint = process.env.AUTH_ENDPOINT!;

export const authClient = createClient({
  clientID: "defang-portal",
  issuer: authEndpoint, // i.e. http://auth:3001 (auth server origin without trailing slash)
});