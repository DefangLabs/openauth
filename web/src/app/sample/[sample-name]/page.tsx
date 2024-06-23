"use client";

import { Loader } from "@/components/loader/loader";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";

import { fetchSamples } from "@/modules/samples/lib/fetch-samples/fetch-samples";
import { getTagColor } from "@/modules/samples/lib/get-tag-color/get-tag-color";
import { Box, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import useSWR from "swr";
import { Tag } from "../components/tag/tag";
import { GenerateCommand } from "./components/generate-command/generate-command";
import { OneClick } from "./components/one-click/one-click";
import { Readme } from "./components/readme/readme";
import { useSampleName } from "./hooks/use-sample-name/use-sample-name";

function SamplePageInner() {
  const sampleName = useSampleName();
  const { data } = useSWR("samples", fetchSamples);
  const sample = data?.find((sample) => sample.name === sampleName);
  const smallerThanLg = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  if (!sample) {
    return (
      <Box p={2}>
        <Typography variant="h1">Sample not found</Typography>
      </Box>
    );
  }

  const { readme } = sample;
  let newReadme = readme;

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
      <Stack direction="row" gap={2} flexWrap="wrap">
        <Stack
          spacing={2}
          direction="column"
          sx={{
            width: {
              xs: "100%",
              lg: "calc(60% - 16px)",
            },
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h1">{sample.title}</Typography>
            <Box>
              {chips.map((chip) => (
                <Tag
                  key={chip.text}
                  chip={chip}
                  ChipProps={{
                    sx: { mr: 1, mb: 1 },
                  }}
                />
              ))}
            </Box>
          </Stack>
          <Box>
            <GenerateCommand sample={sample} />
          </Box>
          {smallerThanLg && <OneClick />}
          <Readme readme={newReadme} />
        </Stack>
        {!smallerThanLg && (
          <Box
            sx={{
              width: {
                xs: "100%",
                lg: "40%",
              },
            }}
          >
            <Box
              sx={{
                height: "auto",
                position: {
                  xs: "static",
                  lg: "sticky",
                },
                top: {
                  xs: "auto",
                  lg: "10px",
                },
              }}
            >
              <OneClick />
            </Box>
          </Box>
        )}
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
