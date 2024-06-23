import { CopyCode } from "@/components/copy-code/copy-code";
import { CopyTypography } from "@/components/copy-typography/copy-typography";
import { Button, Card, Stack, Typography } from "@mui/material";
import { useSampleConfig } from "../../hooks/use-sample-config/use-sample-config";
import { useSampleName } from "../../hooks/use-sample-name/use-sample-name";

export function OneClick() {
  const sampleName = useSampleName();
  const config = useSampleConfig({ sampleName });
  return (
    <Card variant="outlined">
      <Stack spacing={2} p={2}>
        <Typography variant="h3">One Click Deployment</Typography>
        <Typography>
          <b>How it works:</b>
          <br />
          Each sample comes with a GitHub repository template. This includes a
          GitHub action that deploys the sample to Defang using your GitHub
          token.
        </Typography>
        {(config?.length || 0) > 0 && (
          <Stack spacing={2}>
            <Typography>
              <b>Configuration:</b>
              <br />
              The following config values must be set <em>before deploying</em>:
              {config.map((c) => (
                <Typography key={c} py={0.5}>
                  <CopyTypography>{c}</CopyTypography>
                </Typography>
              ))}
            </Typography>
            <CopyCode
              code={config.map((c) => `defang config set ${c}`).join("\n")}
              TextFieldProps={{
                multiline: config.length > 1,
                rows: config.length,
                label: "Set up env vars using this Defang config command:",
              }}
            />
          </Stack>
        )}
        <Button
          href={`https://github.com/new?template_name=sample-${sampleName}-template&template_owner=DefangSamples`}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          size="large"
        >
          Deploy!
        </Button>
      </Stack>
    </Card>
  );
}
