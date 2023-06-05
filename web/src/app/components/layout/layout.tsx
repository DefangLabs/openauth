"use client";

import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { LoggedIn } from "./components/logged-in/logged-in";

export function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  if (!session) return null;
  return <LoggedIn>{children}</LoggedIn>;
}
