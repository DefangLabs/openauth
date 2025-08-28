import { cookies } from "next/headers";
import { authClient } from "../lib/auth-client";
import { setTokens } from "../lib/set-tokens";
import { subjects } from "../lib/subjects";

interface getAuthOptions {
  refresh?: boolean;
}

export async function getAuth({ refresh = false }: getAuthOptions = {}) {
  const accessToken = (await cookies()).get("access_token");
  const refreshToken = (await cookies()).get("refresh_token");

  if (!accessToken) {
    return false;
  }

  let verified;
  try {
    verified = await authClient.verify(subjects, accessToken.value, {
      refresh: refresh ? refreshToken?.value : undefined,
    });
  } catch (err) {
    console.error("@@ Verification threw an exception:", err);
    return false;
  }

  if (verified.err) {
    console.error("@@ Verification error: ", verified.err);
    return false;
  }
  if (verified.tokens) {
    try {
      await setTokens(verified.tokens.access, verified.tokens.refresh);
    } catch (err) {
      console.error("@@ setTokens error:", err);
      // even if setting cookies fails, we treat as unauthenticated so upstream redirect occurs
      return false;
    }
  }

  return verified.subject;
}
