import { COLORS } from "@/modules/mui/constants";
import { Box, styled } from "@mui/material";

export const GradientSurface = styled(Box)`
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid ${COLORS.colorBorder};
`;
