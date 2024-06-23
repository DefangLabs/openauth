import { fetchSampleFile } from "@/modules/samples/lib/fetch-sample-file/fetch-sample-file";
import useSWR from "swr";
import yaml from "js-yaml";
import { z } from "zod";

interface SampleConfigParams {
  sampleName: string;
}

const composeSchema = z.object({
  services: z.record(
    z.object({
      environment: z.array(z.string()),
    })
  ),
});

export function useSampleConfig({ sampleName }: SampleConfigParams) {
  const { data: composeResponse, error: composeError } = useSWR(
    ["/sample-config/compose", sampleName],
    () =>
      fetchSampleFile({
        sampleName,
        branch: "main",
        path: "compose.yaml",
      }).then((res) => res.text())
  );

  const loadedCompose = composeResponse ? yaml.load(composeResponse) : {};

  const parsedCompose = composeSchema.safeParse(loadedCompose);

  if (!parsedCompose.success) {
    return [];
  }

  // let's grab all the env vars from all services and find all the values that don't contain a = sign
  const configVals = Object.values(parsedCompose.data.services)
    .flatMap((service) => service.environment)
    .filter((envVar) => !envVar.includes("="));

  return configVals;
}
