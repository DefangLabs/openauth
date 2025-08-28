"use client";

import { useAccessToken } from "../../hooks/use-access-token";

export function RequireAuthClient({ children }: { children: React.ReactNode }) {
  const { token } = useAccessToken();

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
