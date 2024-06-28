"use client";

import { CopyCode } from "@/components/copy-code/copy-code";
import { analytics } from "@/modules/analytics/lib/analytics";
import { Sample } from "@/modules/samples/lib/fetch-samples/fetch-samples";
import { CopyAll } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

interface GenerateCommandProps {
  sample: Sample;
}

export function GenerateCommand({ sample }: GenerateCommandProps) {
  return (
    <CopyCode
      code={`defang new ${sample.directoryName}`}
      TextFieldProps={{
        label: "Generate with Defang CLI:",
        helperText:
          "Run this Defang command to generate a new project from this sample.",
        fullWidth: true,
        variant: "outlined",
        value: `defang new ${sample.directoryName}`,
        InputProps: {
          readOnly: true,
          inputProps: {
            style: { cursor: "pointer" },
          },
        },
        onClick: (e) => {
          analytics.track("Portal: Clicked Sample Generate Code", {
            sample: sample.name,
            ...sample,
          });
        },
      }}
    />
  );
}
