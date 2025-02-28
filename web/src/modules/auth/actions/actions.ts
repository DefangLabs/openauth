"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "../lib/auth-client";

import { getAuth } from "../lib/get-auth";
import { setTokens } from "../lib/set-tokens";
import { subjects } from "../lib/subjects";

export async function getAuthAction() {
  return getAuth();
}

export async function getAccessTokenAction(
  ...options: Parameters<typeof getAuth>
) {
  const accessToken = cookies().get("access_token");
  const auth = await getAuth(...options);

  if (!accessToken || !auth) {
    return null;
  }

  return {
    token: accessToken?.value,
    claims: auth,
  };
}

export async function loginAction(provider?: string) {
  const accessToken = cookies().get("access_token");
  const refreshToken = cookies().get("refresh_token");

  console.log("@@ login", provider, !!accessToken, !!refreshToken);

  if (accessToken) {
    console.log("@@ accessToken!");
    const verified = await authClient.verify(subjects, accessToken.value, {
      refresh: refreshToken?.value,
    });
    if (!verified.err && verified.tokens) {
      console.log("@@ no error and verified tokens");
      await setTokens(verified.tokens.access, verified.tokens.refresh);
      redirect("/");
    }
  }
  console.log("@@ no access token, redirecting to auth");

  const host = headers().get("x-forwarded-host") ?? headers().get("host");
  const protocol =
    headers().get("x-forwarded-proto") ?? headers().get("proto") ?? "http";
  const { url, challenge } = await authClient.authorize(
    `${protocol}://${host}/auth/callback`,
    "code",
    {
      provider,
    },
  );
  console.log("@@ url", url, challenge);
  redirect(url);
}

export async function logoutAction() {
  cookies().delete("access_token");
  cookies().delete("refresh_token");

  redirect("/");
}
