import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  const isNewDomain = host?.includes("portal.defang.io");

  if (isNewDomain || !host) {
    console.log("@@ No redirect: ", host);
    return NextResponse.next();
  }

  // return NextResponse.redirect(
  //   `${request.nextUrl.protocol}//portal.defang.io${request.nextUrl.pathname}`,
  //   301,
  // );

  console.log(
    "@@ redirect",
    `${request.nextUrl.protocol}//portal.defang.io${request.nextUrl.pathname}`,
  );
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
