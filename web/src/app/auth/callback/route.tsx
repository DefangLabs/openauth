import { setTokens } from "@/modules/auth/lib/set-tokens";
import { authClient } from "@/modules/auth/lib/auth-client";
import { type NextRequest, NextResponse } from "next/server";
import { setLoginCompleteCookie } from "@/modules/auth/actions/actions";
import { loginRedirectCookie } from "@/modules/auth/constants";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  url.host =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  url.protocol = req.headers.get("x-forwarded-proto") ?? "http";
  url.port = req.headers.get("x-forwarded-port") ?? "";
  const code = url.searchParams.get("code");
  const exchanged = await authClient.exchange(
    code!,
    `${url.origin}/auth/callback`,
  );
  if (exchanged.err) {
    console.error("@@ Exchange error: ", exchanged.err);
    return NextResponse.json(exchanged.err, { status: 400 });
  }
  await setTokens(exchanged.tokens.access, exchanged.tokens.refresh);
  await setLoginCompleteCookie();

  // Check for temporary redirect cookie set during the login process
  const cookieStore = await cookies();
  const redirectCookie = cookieStore.get(loginRedirectCookie);
  let redirectPath;

  if (redirectCookie) {
    redirectPath = redirectCookie.value;
    // Clean up the cookie
    cookieStore.delete(loginRedirectCookie);
  }

  // Redirect to the stored path if available, otherwise go to projects page
  const redirectUrl = redirectPath
    ? `${url.origin}${redirectPath}`
    : `${url.origin}/projects`;
  return NextResponse.redirect(redirectUrl);
}
