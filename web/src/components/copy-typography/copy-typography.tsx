import { Tooltip, Typography, TypographyProps } from "@mui/material";
import { useState } from "react";

interface CopyTypographyProps extends TypographyProps {}

export function CopyTypography({ ...TypographyProps }: CopyTypographyProps) {
  const [copied, setCopied] = useState(false);
  return (
    <Tooltip title="Copied!" open={copied} arrow placement="top">
      <Typography
        component={"span"}
        sx={{
          cursor: "pointer",
          backgroundColor: (theme) => theme.palette.grey[100],
          borderRadius: "4px",
          borderColor: (theme) => theme.palette.grey[300],
          borderWidth: "1px",
          borderStyle: "solid",
          padding: "2px 4px",
          color: (theme) => theme.palette.grey[800],
          ...(TypographyProps.sx || {}),
        }}
        onClick={(e: any) => {
          TypographyProps.onClick?.(e);
          const text = e.target.innerText;
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied?.(false), 1000);
        }}
        {...TypographyProps}
      />
    </Tooltip>
  );
}
