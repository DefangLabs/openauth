"use client";

import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { Placeholder } from "../placeholder/placeholder";

/**
 * Hack to force Next.js to play nice with HoCs + rsc.
 */
export function Inner({ Component, ...props }: any) {
  const { session, loading } = useSession();
  const display = !!session && !loading;
  return display ? <Component {...props} /> : <Placeholder />;
}
