import { SampleCard } from "@/components/sample-card/sample-card";
import { useSamples } from "@/modules/samples/hooks/use-samples/use-samples";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";

export function EmptyServices() {
  const { data } = useSamples();
  const django = data?.find((sample) => sample.directoryName === "django");
  const flask = data?.find((sample) => sample.directoryName === "flask");
  const nextjs = data?.find((sample) => sample.directoryName === "nextjs");

  return (
    <Stack p={2} spacing={2} direction="column" mb={10}>
      <Typography variant="h1">Hi! Welcome to Defang.</Typography>
      <Typography variant="h2">
        Click to deploy a popular framework to the cloud:
      </Typography>
      <Grid container spacing={2} sx={{ marginLeft: "-16px !important" }}>
        {django && (
          <Grid item xs={12} md={4}>
            <SampleCard sample={django} />
          </Grid>
        )}
        {flask && (
          <Grid item xs={12} md={4}>
            <SampleCard sample={flask} />
          </Grid>
        )}
        {nextjs && (
          <Grid item xs={12} md={4}>
            <SampleCard sample={nextjs} />
          </Grid>
        )}
      </Grid>
      <Box height={8} />
      <Card sx={{ px: 4, py: 4 }}>
        <Grid container spacing={2} sx={{ marginLeft: "-16px !important" }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" pb={2}>
              Looking for something else? Try searching through our samples.
            </Typography>
            <Link href="/sample" passHref>
              <Button variant="contained">View All Samples</Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" pb={2}>
              Ready to dive deeper? Check out the docs!
            </Typography>
            <Link
              href="https://docs.defang.io/docs/getting-started"
              passHref
              target="_blank"
            >
              <Button variant="contained">Read the Docs</Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" pb={2}>
              Want to deploy from your own machine? Check out the CLI.
            </Typography>
            <Link
              href="https://docs.defang.io/docs/getting-started#install-the-defang-cli"
              passHref
              target="_blank"
            >
              <Button variant="contained">Install Defang CLI</Button>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}
