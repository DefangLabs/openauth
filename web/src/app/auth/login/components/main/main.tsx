import { Button, Stack, Typography } from "@mui/material";
import GitHub from "@mui/icons-material/GitHub";

interface MainProps {
  login: () => void;
  loading: boolean;
}

export function Main({ login, loading }: MainProps) {
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
      }}
      spacing={2}
    >
      <Typography variant="h2">Welcome to Defang</Typography>
      {loading ? (
        "Loading..."
      ) : (
        <Button onClick={login} variant="contained" disableElevation>
          <GitHub height={20} width={20} sx={{ mr: 1 }} />
          Sign in with GitHub
        </Button>
      )}
      <Typography>
        By proceeding you are agreeing to our{" "}
        <a href="https://defang.io/terms-conditions.html" target="_blank">
          Terms and Conditions
        </a>
        .
      </Typography>
    </Stack>
  );
}
