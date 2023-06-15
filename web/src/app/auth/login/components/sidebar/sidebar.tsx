import { useTheme, Stack, Typography } from "@mui/material";

export function SideBar() {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      flexGrow={1}
      style={{ backgroundColor: theme.palette.secondary.main }}
    >
      <Typography variant="h1" color="white">
        Defang
      </Typography>
    </Stack>
  );
}
