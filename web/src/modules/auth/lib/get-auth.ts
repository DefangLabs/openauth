import { cookies } from "next/headers";
import { authClient } from "../lib/auth-client";
import { setTokens } from "../lib/set-tokens";
import { subjects } from "../lib/subjects";

interface getAuthOptions {
  refresh?: boolean;
}

export async function getAuth({ refresh = false }: getAuthOptions = {}) {
  const accessToken = cookies().get("access_token");
  const refreshToken = cookies().get("refresh_token");

  if (!accessToken) {
    return false;
  }

  const verified = await authClient.verify(subjects, accessToken.value, {
    refresh: refresh ? refreshToken?.value : undefined,
  });

  if (verified.err) {
    console.error("@@ Verification error: ", verified.err);
    return false;
  }
  if (verified.tokens) {
    await setTokens(verified.tokens.access, verified.tokens.refresh);
  }

  return verified.subject;
}
