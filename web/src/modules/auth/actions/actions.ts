"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "../lib/auth-client";

import { getAuth } from "../lib/get-auth";
import { setTokens } from "../lib/set-tokens";
import { subjects } from "../lib/subjects";
import { loginCompleteCookie, loginRedirectCookie } from "../constants";

export async function getAuthAction() {
  return getAuth();
}

export async function getAccessTokenAction(
  ...options: Parameters<typeof getAuth>
) {
  const accessToken = (await cookies()).get("access_token");
  const auth = await getAuth(...options);

  if (!accessToken || !auth) {
    return null;
  }

  return {
    token: accessToken?.value,
    claims: auth,
  };
}

export async function loginAction(redirectPath?: string | null) {
  // Handle redirectPath first - store it in a cookie if provided
  if (redirectPath) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: loginRedirectCookie,
      value: redirectPath,
      path: "/",
      maxAge: 300, // 5 minutes
      httpOnly: true,
      sameSite: "lax",
    });
  }

  const accessToken = (await cookies()).get("access_token");
  const refreshToken = (await cookies()).get("refresh_token");

  if (accessToken) {
    const verified = await authClient.verify(subjects, accessToken.value, {
      refresh: refreshToken?.value,
    });
    if (!verified.err && verified.tokens) {
      await setTokens(verified.tokens.access, verified.tokens.refresh);
      redirect("/projects");
    }
  }

  // Prepare callback URL for authorization
  const host =
    (await headers()).get("x-forwarded-host") ?? (await headers()).get("host");
  const protocol =
    (await headers()).get("x-forwarded-proto") ??
    (await headers()).get("proto") ??
    "http";
  const callbackUrl = `${protocol}://${host}/auth/callback`;

  // Authorize with the provider
  const { url } = await authClient.authorize(callbackUrl, "code");
  redirect(url);
}

export async function logoutAction() {
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");

  redirect("/auth/login");
}

export async function setLoginCompleteCookie() {
  (await cookies()).set({
    name: loginCompleteCookie,
    value: new Date().toISOString(),
    httpOnly: false,
    sameSite: "lax",
  });
}

export async function unsetLoginCompleteCookie() {
  (await cookies()).delete(loginCompleteCookie);
  return true;
}
