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
      environment: z.array(z.string()).or(z.record(z.string())).nullish(),
    })
  ),
});

export function useSampleConfig({ sampleName }: SampleConfigParams) {
  const res = useSWR(["/sample-config/compose", sampleName], () =>
    fetchSampleFile({
      sampleName,
      branch: "main",
      path: "compose.yaml",
    }).then((res) => res.text())
  );
  const { data } = res;

  const loadedCompose = data ? yaml.load(data) : {};

  const parsedCompose = composeSchema.safeParse(loadedCompose);

  if (!parsedCompose.success) {
    return {
      config: [],
      ...res,
    };
  }

  let config: string[] = [];

  Object.values(parsedCompose.data.services).forEach((service) => {
    const env = service.environment;
    const isArray = Array.isArray(env);
    const isEmpty = !env;
    if (isEmpty) return;
    if (isArray) {
      config = [...config, ...env.filter((e) => !e.includes("="))];
    } else {
      Object.entries(env).forEach(([key, value]) => {
        if (!value) {
          config.push(key);
        }
      });
    }
  });

  return {
    config,
    ...res,
  };
}
