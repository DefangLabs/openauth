import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

const COLORS = {
  primary: "",
  secondary: "",
};

const theme = createTheme({
  palette: {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
