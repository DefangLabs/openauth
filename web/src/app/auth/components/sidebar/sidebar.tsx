import { Stack, Typography, useTheme } from "@mui/material";

export function SideBar() {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      flexGrow={1}
      justifyContent="center"
      sx={{ padding: 2, px: 8, maxWidth: 600, margin: "auto" }}
      spacing={2}
    >
      <div>
        <Typography variant="h2" color="white">
          AI-assisted Development
        </Typography>
      </div>
      <div>
        <Typography variant="h2" color="white">
          Automated CI/CD
        </Typography>
      </div>
      <div>
        <Typography variant="h2" color="white">
          Production-ready Environments
        </Typography>
      </div>
    </Stack>
  );
}
