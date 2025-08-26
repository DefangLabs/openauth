import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const marketplace_token = formData.get("x-amzn-marketplace-token") as string;

  if (!marketplace_token) {
    return NextResponse.redirect(
      new URL("/aws-marketplace?error=missing_token", request.url)
    );
  }

  // Store the marketplace token in a temporary cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: "dfng_temp_marketplace_token",
    value: marketplace_token,
    path: "/",
    maxAge: 300, // 5 minutes
    httpOnly: true,
    sameSite: "lax",
  });

  const redirectUrl = new URL("/aws-marketplace-subscribe", request.url);
  return NextResponse.redirect(redirectUrl, 303); // "303 See Other" to avoid resubmission
}
