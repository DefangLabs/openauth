import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    url.hostname;

  if (hostname === "portal.defang.dev") {
    url.hostname = "portal.defang.io";
    url.port = "";
    url.protocol = "https";
    return NextResponse.redirect(url.toString(), { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
