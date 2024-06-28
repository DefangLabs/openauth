import { Chip, ChipProps } from "@mui/material";

interface TagProps {
  chip: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  ChipProps?: ChipProps;
}

export function Tag({ chip, ChipProps = {} }: TagProps) {
  return (
    <Chip
      label={chip.text}
      style={{
        backgroundColor: chip.bgColor,
        color: chip.textColor,
      }}
      size="small"
      {...ChipProps}
    />
  );
}
