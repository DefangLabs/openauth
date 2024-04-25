"use client";

import { analytics } from "@/modules/analytics/lib/analytics";
import { useDefangClient } from "@/modules/defang/hooks/use-defang-client/use-defang-client";
import { Placeholder } from "@/modules/kratos/components/login-required/components/placeholder/placeholder";
import { useSession } from "@/modules/kratos/hooks/use-session/use-session";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useSession();
  const client = useDefangClient();
  const display = !!session && !loading;

  useEffect(() => {
    if (!display) return;
    client?.whoAmI({}, (err, res) => {
      if (err) {
        console.log("@@ error getting whoami", err);
        return;
      }
      analytics.identify(res.userId);
    });
  }, [client, display]);

  return display ? <>{children}</> : <Placeholder />;
}
