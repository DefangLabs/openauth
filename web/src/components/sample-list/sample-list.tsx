"use client";

import { analytics } from "@/modules/analytics/lib/analytics";
import { useSamples } from "@/modules/samples/hooks/use-samples/use-samples";
import { getTagColor } from "@/modules/samples/lib/get-tag-color/get-tag-color";
import { Cancel } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Tag } from "../tag/tag";
import { SampleCard } from "../sample-card/sample-card";

export function SampleList() {
  const search = useSearchParams().get("search") || "";
  const [searchQuery, setSearchQuery] = useState(search);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      analytics.track("Portal: Searched Samples", {
        searchQuery: debouncedSearchQuery,
      });
    }
  }, [debouncedSearchQuery]);

  const { data } = useSamples();
  const processedSamples = data;

  const filteredSamples = useMemo(() => {
    if (!searchQuery) return processedSamples;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return processedSamples?.filter(
      (sample) =>
        sample.name.toLowerCase().includes(lowerCaseQuery) ||
        sample.category.toLowerCase().includes(lowerCaseQuery) ||
        sample.directoryName.toLowerCase().includes(lowerCaseQuery) ||
        sample.title.toLowerCase().includes(lowerCaseQuery) ||
        sample.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)) ||
        sample.languages.some((lang) =>
          lang.toLowerCase().includes(lowerCaseQuery),
        ),
    );
  }, [searchQuery, processedSamples]);

  return (
    <Stack spacing={2} direction="column" mb={10}>
      <Stack direction="row" flexWrap="wrap" spacing={2}>
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
      <Grid container spacing={2} sx={{ marginLeft: "-16px !important" }}>
        {filteredSamples?.map((sample) => (
          <Grid item key={sample.name} xs={12} sm={6} lg={4}>
            <SampleCard sample={sample} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
