import { NextRequest, NextResponse } from "next/server";

/**
 * We need to keep this around for backwards compatibility with the old
 * GitHub login flow with Kratos.
 */
export function GET(req: NextRequest) {
  const authUrl = new URL(process.env.NEXT_PUBLIC_AUTH_URL!);
  const url = new URL(req.url);
  authUrl.pathname = "/github/callback";
  authUrl.search = url.search;
  return NextResponse.redirect(authUrl.toString(), { status: 302 });
}
