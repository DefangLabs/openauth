import { Box, Stack, CircularProgress, Typography } from "@mui/material";

export function PageLoading() {
  return (
    <Box
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Stack direction="column" spacing={2} alignItems="center">
        <CircularProgress />
        <Typography variant="h2">Loading...</Typography>
      </Stack>
    </Box>
  );
}
