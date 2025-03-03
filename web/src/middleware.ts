import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log(
    "@@ urlinfo: ",
    request.headers.get("x-forwarded-host"),
    request.headers.get("host"),
    url.hostname,
  );
  console.log("@@ nexturl: ", request.nextUrl.toString());
  const hostname =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    url.hostname;

  if (hostname === "portal.defang.dev") {
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
