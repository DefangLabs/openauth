import { createClient } from "@openauthjs/openauth/client";
import assert from "assert";

assert(process.env.NEXT_PUBLIC_AUTH_URL, "NEXT_PUBLIC_AUTH_URL must be set");

export const authClient = createClient({
  clientID: "defang-portal",
  issuer: process.env.NEXT_PUBLIC_AUTH_URL!,
  fetch: (...args: [RequestInfo, RequestInit?]) => {
    console.log("@@ fetching", ...args);
    // log responses for debugging without interfering with the actual fetch

    return fetch(...args).then(async (response) => {
      const clone = response.clone();
      const text = await clone.text();
      console.log("@@ response:", text);
      return response;
    });
  },
});
