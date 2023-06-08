"use client";

import { useName } from "@/modules/profiles/hooks/use-name/use-name";
import { Stack, Typography } from "@mui/material";

export default function AccountPage() {
  const name = useName();
  return (
    <Stack spacing={1}>
      <Typography variant="h1">Account</Typography>
      <Typography>
        Welcome to the Defang Opinionated Platform, <b>{name}</b>.
      </Typography>
    </Stack>
  );
}
