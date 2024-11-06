import { useMemo } from "react";
import useSWR from "swr";
import { fetchSamples } from "../../lib/fetch-samples/fetch-samples";
import { getTagColor } from "../../lib/get-tag-color/get-tag-color";

export function useSamples() {
  const response = useSWR("samples", fetchSamples);
  const data = response.data;

  const processedSamples = useMemo(() => {
    return data?.map((sample) => {
      //"actualTags" are languages and tags combined into one array with duplicates removed
      const actualTags = Array.from(
        new Set([...sample.tags, ...sample.languages].filter((tag) => !!tag)),
      );
      // "chips" are the tags that are displayed on the sample card, we colorize certain languages and frameworks
      const chips = actualTags.map(getTagColor);
      return {
        ...sample,
        chips,
      };
    });
  }, [data]);

  return {
    ...response,
    data: processedSamples,
  };
}
