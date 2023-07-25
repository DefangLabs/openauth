import { Stack } from "@mui/material";

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <Stack
      direction="column"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: 2,
        px: 8,
        backgroundColor: "white",
        borderRadius: 2,
        margin: {
          xs: 1,
          sm: 2,
        },
        height: {
          xs: "100%",
        },
      }}
      spacing={2}
    >
      {children}
    </Stack>
  );
}
