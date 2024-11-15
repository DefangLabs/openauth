import { CopyCode } from "@/components/copy-code/copy-code";
import { CopyTypography } from "@/components/copy-typography/copy-typography";
import { analytics } from "@/modules/analytics/lib/analytics";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useSampleConfig } from "../../hooks/use-sample-config/use-sample-config";
import { useSampleName } from "../../hooks/use-sample-name/use-sample-name";

export function OneClick() {
  const sampleName = useSampleName();
  const { config, isLoading } = useSampleConfig({ sampleName });
  return (
    <Card variant="outlined">
      <Stack spacing={2} p={2}>
        <Typography variant="h3">One Click Container Deployment</Typography>
        <Typography>
          <b>How it works:</b>
          <br />
          Each sample comes with a GitHub repository template. This includes a
          GitHub action that deploys the sample to Defang using your GitHub
          token.
        </Typography>
        {isLoading && <CircularProgress />}
        {(config?.length || 0) > 0 && (
          <Stack spacing={2}>
            <Typography>
              <b>Configuration:</b>
              <br />
              The following config values must be set <em>before deploying</em>:
              {config.map((c) => (
                <Box key={c} py={0.5}>
                  <CopyTypography
                    onClick={() => {
                      analytics.track("Portal: Copied Sample Config Key", {
                        sample: sampleName,
                        config: c,
                      });
                    }}
                  >
                    {c}
                  </CopyTypography>
                </Box>
              ))}
            </Typography>
            <CopyCode
              code={config.map((c) => `defang config set ${c}`).join("\n")}
              TextFieldProps={{
                multiline: config.length > 1,
                rows: config.length,
                label: "Set up env vars using this Defang config command:",
                onClick: () => {
                  analytics.track("Portal: Copied Sample Config Command", {
                    sample: sampleName,
                    config,
                  });
                },
              }}
            />
          </Stack>
        )}
        <Button
          href={`https://github.com/new?template_owner=DefangSamples&template_name=sample-${sampleName}-template&name=${sampleName}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          size="large"
          onClick={() => {
            analytics.track("Portal: Clicked Sample One Click Deploy", {
              sample: sampleName,
            });
          }}
        >
          Deploy to Playground
        </Button>
        <Button
          href={`https://github.com/DefangLabs/samples/tree/main/samples/${sampleName}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="large"
          onClick={() => {
            analytics.track("Portal: Clicked Sample GitHub Link", {
              sample: sampleName,
            });
          }}
        >
          Open on GitHub
        </Button>
      </Stack>
    </Card>
  );
}
