import {
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import { Inter, Exo } from "next/font/google";

const body = Inter({ variable: "--body-font", subsets: ["latin-ext"] });
const headers = Exo({ variable: "--headers-font", subsets: ["latin-ext"] });

export const FONTS = {
  headers,
  body,
} as const;

export const COLORS = {
  primary: "#283766",
  secondary: "#7ac3c7",
} as const;

export const GRADIENTS = {
  primary:
    "linear-gradient(311deg, rgba(63, 178, 175, .67), rgba(80, 54, 163, .67) 53%, rgba(9, 23, 76, .85)), linear-gradient(54deg, rgba(255, 131, 122, .25), rgba(255, 131, 122, 0) 28%), linear-gradient(241deg, rgba(228, 122, 255, .32), #d4f0f8 36%)",
} as const;

const theme = createTheme({
  palette: {
    primary: { main: COLORS.primary },
    secondary: { main: COLORS.secondary, contrastText: "#ffffff" },
  },
  typography: {
    fontFamily: 'var(--body-font), "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: 'var(--headers-font), "Helvetica Neue", Arial, sans-serif',
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'var(--headers-font), "Helvetica Neue", Arial, sans-serif',
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'var(--headers-font), "Helvetica Neue", Arial, sans-serif',
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'var(--headers-font), "Helvetica Neue", Arial, sans-serif',
      fontSize: "1.125rem",
    },
    h5: {
      fontFamily: 'var(--headers-font), "Helvetica Neue", Arial, sans-serif',
      fontSize: "1rem",
    },
    h6: {
      fontFamily: 'var(--headers-font), "Helvetica Neue", Arial, sans-serif',
      fontSize: "0.75rem",
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${headers.variable} ${body.variable}`}>
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
    </div>
  );
}
