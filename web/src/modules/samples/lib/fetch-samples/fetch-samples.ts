import { SAMPLES_ENDPOINT } from "../../constants";

export interface Sample {
  name: string;
  category: string;
  readme: string;
  directoryName: string;
  title: string;
  shortDescription: string;
  tags: string[];
  languages: string[];
}

/**
 * Fetch samples from docs json.
 */
export async function fetchSamples() {
  const response = await fetch(SAMPLES_ENDPOINT);
  const samples = (await response.json()) as Sample[];
  return samples;
}
