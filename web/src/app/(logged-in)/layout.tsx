"use client";

import { LoggedIn } from "@/app/(logged-in)/components/logged-in/logged-in";
import { useAccessToken } from "@/modules/auth/hooks/use-access-token";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "../auth/constants";
import { useEffect } from "react";

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

  useEffect(() => {
    if (!token && !isLoading) {
      router.push(LOGIN_ROUTE);
    }
  }, [token, isLoading, router]);

  if (!token && !isLoading) {
    return null;
  }

  return <LoggedIn>{children}</LoggedIn>;
}
