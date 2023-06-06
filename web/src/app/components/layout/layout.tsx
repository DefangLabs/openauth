"use client";

import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { LoggedIn } from "./components/logged-in/logged-in";
import { LoggedOut } from "./components/logged-out/logged-out";

export function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  if (!session) return <LoggedOut>{children}</LoggedOut>;
  return <LoggedIn>{children}</LoggedIn>;
}
