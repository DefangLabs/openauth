import { LOGIN_ROUTE } from "@/app/auth/constants";
import { redirect } from "next/navigation";
import { loginRedirectParam } from "../constants";
import { getAuth } from "./get-auth";

interface RequireAuthOptions {
  redirectPath?: string;
}

export async function requireAuth({ redirectPath }: RequireAuthOptions = {}) {
  const auth = await getAuth();
  if (!auth) {
    // Add the redirect path as a query parameter to the login URL
    if (redirectPath) {
      const loginUrl = new URL(LOGIN_ROUTE, "http://localhost");
      loginUrl.searchParams.set(loginRedirectParam, redirectPath);

      // Create a relative URL by removing the base
      const relativeLoginUrl = loginUrl.pathname + loginUrl.search;

      redirect(relativeLoginUrl);
    } else {
      redirect(LOGIN_ROUTE);
    }
  }
}
