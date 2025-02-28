import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.hostname === "portal.defang.dev") {
    url.hostname = "portal.defang.io";
    return NextResponse.redirect(url.toString(), { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
