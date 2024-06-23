"use client";

import { Loader } from "@/components/loader/loader";
import { LoginRequired } from "@/modules/kratos/components/login-required/login-required";

import { fetchSamples } from "@/modules/samples/lib/fetch-samples/fetch-samples";
import { getTagColor } from "@/modules/samples/lib/get-tag-color/get-tag-color";
import {
  Box,
  Card,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Tag } from "./components/tag/tag";
import { useDebounce } from "@uidotdev/usehooks";
import { analytics } from "@/modules/analytics/lib/analytics";
import { Cancel, ClearAllRounded } from "@mui/icons-material";

interface Chip {
  bgColor: string;
  textColor: string;
  text: string;
}

export function SamplesPageInner() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery) {
      analytics.track("Portal: Searched Samples", {
        searchQuery: debouncedSearchQuery,
      });
    }
  }, [debouncedSearchQuery]);

  const { data } = useSWR("samples", fetchSamples);

  const processedSamples = useMemo(() => {
    return data?.map((sample) => {
      //"actualTags" are languages and tags combined into one array with duplicates removed
      const actualTags = Array.from(
        new Set([...sample.tags, ...sample.languages].filter((tag) => !!tag))
      );
      // "chips" are the tags that are displayed on the sample card, we colorize certain languages and frameworks
      const chips = actualTags.map(getTagColor);
      return {
        ...sample,
        chips,
      };
    });
  }, [data]);

  const filteredSamples = useMemo(() => {
    if (!searchQuery) return processedSamples;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return processedSamples?.filter(
      (sample) =>
        sample.name.toLowerCase().includes(lowerCaseQuery) ||
        sample.category.toLowerCase().includes(lowerCaseQuery) ||
        sample.readme.toLowerCase().includes(lowerCaseQuery) ||
        sample.directoryName.toLowerCase().includes(lowerCaseQuery) ||
        sample.title.toLowerCase().includes(lowerCaseQuery) ||
        sample.shortDescription.toLowerCase().includes(lowerCaseQuery) ||
        sample.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)) ||
        sample.languages.some((lang) =>
          lang.toLowerCase().includes(lowerCaseQuery)
        )
    );
  }, [searchQuery, processedSamples]);

  return (
    <Stack p={2} spacing={2} direction="column" mb={10}>
      <Stack direction="row" flexWrap="wrap" spacing={2}>
        <Typography variant="h1">Samples</Typography>
        <Box
          sx={{
            w: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search samples..."
            size="small"
            InputProps={{
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")}>
                    <Cancel />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>
      <Box>
        <Typography>
          Here you can find a list of samples that you can use to get started
          with Defang.
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ marginLeft: "-16px !important" }}>
        {filteredSamples?.map((sample) => (
          <Grid item key={sample.name} xs={12} sm={6} lg={4}>
            <Link
              href={`/sample/${sample.name}`}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ width: "100%", height: "100%" }} variant="outlined">
                <Stack direction="column" height="100%" gap={2}>
                  <Typography variant="h3" sx={{ px: 2, pt: 2 }}>
                    {sample.title}
                  </Typography>
                  <Typography sx={{ px: 2 }}>
                    {sample.shortDescription}
                  </Typography>
                  <Box sx={{ px: 2, pb: 2 }}>
                    {sample.chips.map((chip) => (
                      <Tag
                        key={chip.text}
                        chip={chip}
                        ChipProps={{
                          sx: { mr: 1, mb: 1 },
                          onClick: (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setSearchQuery(chip.text);
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Stack>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

const SamplesPageOuter = LoginRequired(function SamplesPage() {
  return (
    <Loader>
      <SamplesPageInner />
    </Loader>
  );
});

export default SamplesPageOuter;
