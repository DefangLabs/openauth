import { redirect } from "next/navigation";

import { LOGIN_ROUTE } from "@/app/auth/constants";
import { getAuth } from "./get-auth";

export async function requireAuth() {
  const auth = await getAuth();
  if (!auth) {
    redirect(LOGIN_ROUTE);
  }
}
