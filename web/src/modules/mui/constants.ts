import { hexToRgba } from "@/helpers/hex-to-rgba/hex-to-rgba";

export const COLORS = {
  primary: "#283766",
  secondary: "#7ac3c7",
  lightGrey: "#eeeeee",
  darkGrey: "#666666",
  white: "#ffffff",
  colorBorder: hexToRgba("#283766", 0.3),
} as const;

export const GRADIENTS = {
  primary:
    "linear-gradient(311deg, rgba(63, 178, 175, .67), rgba(80, 54, 163, .67) 53%, rgba(9, 23, 76, .85)), linear-gradient(54deg, rgba(255, 131, 122, .25), rgba(255, 131, 122, 0) 28%), linear-gradient(241deg, rgba(228, 122, 255, .32), #d4f0f8 36%)",
} as const;
