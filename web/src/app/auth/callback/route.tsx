import { setTokens } from "@/modules/auth/lib/set-tokens";
import { authClient } from "@/modules/auth/lib/auth-client";
import { type NextRequest, NextResponse } from "next/server";
import { setLoginCompleteCookie } from "@/modules/auth/actions/actions";

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
  return NextResponse.redirect(`${url.origin}/`);
}
