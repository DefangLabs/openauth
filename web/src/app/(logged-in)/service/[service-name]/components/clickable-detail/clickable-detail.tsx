import { thinGreyBorder } from "@/modules/mui/constants";
import {
  Alert,
  Box,
  Paper,
  Snackbar,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MouseEvent, useState } from "react";

interface ClickableDetailProps {
  title: string;
  content: string | number | undefined;
}

const ClickableTypography = styled(Typography)`
  cursor: pointer;
  /* max-width: 120px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 30ch;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 100%;
  }
`;

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: "1rem",
  },
}));

export function ClickableDetail({ title, content }: ClickableDetailProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const clickToCopy = (e: MouseEvent<HTMLSpanElement>) => {
    navigator.clipboard.writeText((e.target as any).textContent || "error");
    setOpen(true);
  };

  if (!content) return null;

  return (
    <Paper
      sx={{
        width: {
          xs: "100%",
          sm: "50%",
          md: "25%",
          lg: "20%",
        },
        p: 1,
        ...thinGreyBorder,
      }}
    >
      <Typography variant="h5" fontWeight="700">
        {title}
      </Typography>
      <CustomTooltip title={`Click to copy: \n${content}`} placement="bottom">
        <ClickableTypography onClick={clickToCopy}>
          {content}
        </ClickableTypography>
      </CustomTooltip>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Copied to clipboard!</Alert>
      </Snackbar>
    </Paper>
  );
}
