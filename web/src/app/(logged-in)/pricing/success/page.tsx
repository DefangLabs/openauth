import { requireAuth } from "@/modules/auth/lib/require-auth";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

async function PricingPage() {
  await requireAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1">Thank you for subscribing!</Typography>
      <Link href="/projects">
        <Button>Back to projects</Button>
      </Link>
    </Box>
  );
}

export default PricingPage;
