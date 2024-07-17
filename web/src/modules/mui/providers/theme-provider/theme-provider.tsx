import {
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import { Inter, Exo } from "next/font/google";
import { COLORS, thinGreyBorder } from "../../constants";

const body = Inter({ variable: "--body-font", subsets: ["latin-ext"] });
const headers = Exo({ variable: "--headers-font", subsets: ["latin-ext"] });

export const FONTS = {
  headers,
  body,
} as const;

const theme = createTheme({
  palette: {
    primary: { main: COLORS.primary },
    secondary: { main: COLORS.white },
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
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.white,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.white,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        sx: thinGreyBorder,
      },
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
              backgroundColor: COLORS.background,
            },
            [".MuiDataGrid-root"]: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </div>
  );
}
