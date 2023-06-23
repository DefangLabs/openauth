"use client";

import { GRADIENTS } from "@/modules/mui/constants";
import { Box, Typography } from "@mui/material";

export function Placeholder() {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: GRADIENTS.primary,
      }}
    >
      <Typography variant="h3" color="white">
        Authorizing...
      </Typography>
    </Box>
  );
}
