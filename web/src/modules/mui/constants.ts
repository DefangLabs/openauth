import { hexToRgba } from "@/lib/hex-to-rgba/hex-to-rgba";
import { SxProps } from "@mui/material";

export const COLORS = {
  primary: "#1769ff",
  secondary: "#7ac3c7",
  lightGrey: "#eeeeee",
  background: "#f6f6f6",
  darkGrey: "#666666",
  white: "#ffffff",
  colorBorder: hexToRgba("#283766", 0.3),
} as const;

export const GRADIENTS = {
  primary: "linear-gradient(135deg, #011d50, #093e9f)",
} as const;

export const thinGreyBorder: SxProps = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
  overflow: "hidden",
};
