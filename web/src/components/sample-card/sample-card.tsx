"use client";

import { analytics } from "@/modules/analytics/lib/analytics";
import { useSamples } from "@/modules/samples/hooks/use-samples/use-samples";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tag } from "../tag/tag";

interface SampleCardProps {
  sample: NonNullable<ReturnType<typeof useSamples>["data"]>[number];
}

export function SampleCard({ sample }: SampleCardProps) {
  const router = useRouter();

  return (
    <Link href={`/sample/${sample.name}`} style={{ textDecoration: "none" }}>
      <Card sx={{ width: "100%", height: "100%" }} variant="outlined">
        <Stack direction="column" height="100%" gap={2}>
          <Typography variant="h3" sx={{ px: 2, pt: 2 }}>
            {sample.title}
          </Typography>
          <Typography sx={{ px: 2 }}>{sample.shortDescription}</Typography>
          <Box sx={{ px: 2, pb: 2 }}>
            {sample.chips.map((chip) => (
              <Tag
                key={chip.text}
                chip={chip}
                ChipProps={{
                  sx: {
                    mr: 0.5,
                    mb: 0.5,
                    cursor: "pointer",
                  },
                  onClick: (e) => {
                    router.push(
                      `/sample?search=${encodeURIComponent(chip.text)}`,
                    );
                    analytics.track("Portal: Clicked Tag", {
                      tag: chip.text,
                    });
                  },
                }}
              />
            ))}
          </Box>
        </Stack>
      </Card>
    </Link>
  );
}
