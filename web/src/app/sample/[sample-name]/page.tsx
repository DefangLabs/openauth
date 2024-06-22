"use client";

import { Loader } from "@/components/loader/loader";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";

import { fetchSamples } from "@/modules/samples/lib/fetch-samples/fetch-samples";
import { getTagColor } from "@/modules/samples/lib/get-tag-color/get-tag-color";
import { CopyAll } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";

function SamplePageInner() {
  const sampleName = useParams()["sample-name"] as string;
  const { data } = useSWR("samples", fetchSamples);
  const sample = data?.find((sample) => sample.name === sampleName);

  if (!sample) {
    return (
      <Box p={2}>
        <Typography variant="h1">Sample not found</Typography>
      </Box>
    );
  }

  const { readme } = sample;
  let newReadme = readme;
  // find the line that has --- followed in the few lines by "Title: " in the readme
  // then split and take everything before the --- as the new readme
  const titleMatch = readme.match(/---\n(?:.*\n){0,3}Title: (.*)\n/);
  if (titleMatch) {
    newReadme = readme.split(titleMatch[0])[0];
  }

  const tags = Array.from(
    new Set([...sample.tags, ...sample.languages].filter((tag) => !!tag))
  );
  const chips = tags.map(getTagColor);

  return (
    <Box p={2} mb={10}>
      <Stack direction="row" gap={2}>
        <Stack spacing={2} direction="column" width="70%">
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h1">{sample.title}</Typography>
            <Box>
              {chips.map((chip) => (
                <Chip
                  key={chip.text}
                  label={chip.text}
                  style={{
                    backgroundColor: chip.bgColor,
                    color: chip.textColor,
                  }}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Stack>
          <Box>
            <TextField
              label="Generate with CLI:"
              fullWidth
              variant="outlined"
              value={`defang new ${sample.directoryName}`}
              InputProps={{
                readOnly: true,
                sx: { cursor: "pointer" },
                inputProps: {
                  style: { cursor: "pointer" },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <CopyAll />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
                <ReactMarkdown>{newReadme}</ReactMarkdown>
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
}

const SamplePageOuter = LoginRequired(function SamplePage() {
  return (
    <Loader>
      <SamplePageInner />
    </Loader>
  );
});

export default SamplePageOuter;
