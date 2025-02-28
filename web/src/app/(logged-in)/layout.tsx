"use client";

import { LoggedIn } from "@/app/(logged-in)/components/logged-in/logged-in";
import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "../auth/constants";

const tokenOptions = {
  refresh: false,
};

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, isLoading } = useAccessToken(tokenOptions);
  if (!token && isLoading) {
    return null;
  }
  if (!token && !isLoading) {
    router.push(LOGIN_ROUTE);
    return null;
  }
  return <LoggedIn>{children}</LoggedIn>;
}
