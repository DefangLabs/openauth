import { logoutAction } from "@/modules/auth/actions/actions";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { LOGIN_ROUTE } from "../constants";

export async function GET(req: NextRequest) {
  await logoutAction();
  redirect(LOGIN_ROUTE);
}
