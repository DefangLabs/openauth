"use client";

import { Loader } from "@/components/loader/loader";

import { SampleList } from "@/components/sample-list/sample-list";
import { Stack, Typography } from "@mui/material";

function SamplesPageInner() {
  return (
    <Stack p={2} spacing={2} direction="column" mb={10}>
      <Typography variant="h1">Samples</Typography>
      <SampleList />
    </Stack>
  );
}

const SamplesPageOuter = function SamplesPage() {
  return (
    <Loader>
      <SamplesPageInner />
    </Loader>
  );
};

export default SamplesPageOuter;
