import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  const authUrl = new URL(process.env.NEXT_PUBLIC_AUTH_URL!);
  const url = new URL(req.url);
  authUrl.pathname = "/github/callback";
  authUrl.search = url.search;
  return NextResponse.redirect(authUrl.toString(), { status: 302 });
}
