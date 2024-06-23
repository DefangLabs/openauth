"use client";

import { Box, Card, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface ReadmeProps {
  readme: string;
}

export function Readme({ readme }: ReadmeProps) {
  return (
    <Card variant="outlined">
      <Box p={2}>
        <Typography
          component="div"
          sx={{
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              fontFamily: `var(--headers-font), "Helvetica Neue", Arial, sans-serif`,
            },
          }}
        >
          <ReactMarkdown>{readme}</ReactMarkdown>
        </Typography>
      </Box>
    </Card>
  );
}
