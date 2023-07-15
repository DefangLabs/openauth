import {
  Alert,
  Box,
  Snackbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { MouseEvent, useState } from "react";

interface ClickableDetailProps {
  title: string;
  content: string | number | undefined;
}

const ClickableTypography = styled(Typography)`
  cursor: pointer;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export function ClickableDetail({ title, content }: ClickableDetailProps) {
  const [open, setOpen] = useState(false);

  const clickToCopy = (e: MouseEvent<HTMLSpanElement>) => {
    navigator.clipboard.writeText((e.target as any).textContent || "error");
    setOpen(true);
  };

  if (!content) return null;

  return (
    <Box>
      <Typography variant="h5" fontWeight="700">
        {title}
      </Typography>
      <Tooltip title={`Click to copy: ${content}`} placement="top">
        <ClickableTypography onClick={clickToCopy}>
          {content}
        </ClickableTypography>
      </Tooltip>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Copied to clipboard!</Alert>
      </Snackbar>
    </Box>
  );
}
