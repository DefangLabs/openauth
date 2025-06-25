import { loginAction } from "@/modules/auth/actions/actions";
import { loginRedirectParam } from "@/modules/auth/constants";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const redirectPath = searchParams.get(loginRedirectParam);

  return loginAction(redirectPath);
}
