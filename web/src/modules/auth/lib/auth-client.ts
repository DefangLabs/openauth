import { createClient } from "@openauthjs/openauth/client";
import assert from "assert";

assert(process.env.NEXT_PUBLIC_AUTH_URL, "NEXT_PUBLIC_AUTH_URL must be set");

export const authClient = createClient({
  clientID: "defang-portal",
  issuer: process.env.NEXT_PUBLIC_AUTH_URL!,
  fetch: (...args: [RequestInfo, RequestInit?]) => {
    return fetch(...args).then(async (response) => {
      // previously used for debugging
      return response;
    });
  },
});
