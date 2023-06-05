"use client";

import { kratosClient } from "@/modules/kratos/lib/kratos-client/kratos-client";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  return (
    <div>
      <Typography>Auth</Typography>
      <Button
        onClick={async () => {
          const logoutFlow = await kratosClient.createBrowserLogoutFlow();
          router.push(logoutFlow.data.logout_url);
        }}
      >
        Logout
      </Button>
    </div>
  );
}
