import {
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";

export const COLORS = {
  primary: "#4491fd",
  secondary: "#283665",
} as const;

const theme = createTheme({
  palette: {
    primary: { main: COLORS.primary },
    secondary: { main: COLORS.secondary },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.125rem",
    },
    h5: {
      fontSize: "1rem",
    },
    h6: {
      fontSize: "0.75rem",
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      />
      {children}
    </MuiThemeProvider>
  );
}
