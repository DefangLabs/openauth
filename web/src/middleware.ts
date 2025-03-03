import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host");

  if (host === "portal.defang.dev") {
    url.hostname = "portal.defang.io";
    url.port = "";
    url.protocol = "https";
    return NextResponse.redirect(url.toString(), { status: 302 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
