"use client";

import { LoggedIn } from "@/app/(logged-in)/components/logged-in/logged-in";
import { useAccessToken } from "@/modules/auth/hooks/use-access-token";

const tokenOptions = {
  refresh: false,
};

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAccessToken(tokenOptions);

  return <LoggedIn>{children}</LoggedIn>;
}
