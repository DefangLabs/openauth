"use client";

import { Placeholder } from "@/modules/kratos/components/login-required/components/placeholder/placeholder";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useSession();
  const display = !!session && !loading;
  return display ? <>{children}</> : <Placeholder />;
}
