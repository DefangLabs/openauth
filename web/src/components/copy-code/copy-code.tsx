import { CheckCircle, CopyAll } from "@mui/icons-material";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useId, useState } from "react";

interface CopyCodeProps {
  code: string;
  TextFieldProps?: TextFieldProps;
}

export function CopyCode({ code, TextFieldProps = {} }: CopyCodeProps) {
  const id = useId();
  const [copied, setCopied] = useState(false);

  return (
    <TextField
      value={code}
      {...TextFieldProps}
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied?.(false), 1000);
      }}
      InputProps={{
        ...(TextFieldProps.InputProps || {}),
        readOnly: true,
        inputProps: {
          ...(TextFieldProps.InputProps?.inputProps || {}),
          style: {
            cursor: "pointer",
            whiteSpace: "pre",
            overflow: "hidden",
            textOverflow: "ellipsis",
            ...(TextFieldProps.InputProps?.inputProps?.style || {}),
          },
          id: `copy-code-${id}`,
        },
        endAdornment: copied ? (
          <InputAdornment position="end">
            <CheckCircle sx={{ color: "green" }} />
          </InputAdornment>
        ) : (
          <InputAdornment position="end" sx={{ cursor: "pointer" }}>
            <CopyAll />
          </InputAdornment>
        ),
      }}
    />
  );
}
