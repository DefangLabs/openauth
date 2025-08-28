"use client";

import { useSearchParams } from "next/navigation";
import { FeatureFlag } from "../feature-flags";

/**
 * Client-only hook that reads a feature flag from the URL's query string.
 *
 * The hook uses Next.js' `useSearchParams` to access the current URL. It
 * returns `true` or `false` when the query string contains an explicit
 * override (e.g. `?ff_TENANT_SWITCHER=true`) and `undefined` otherwise.
 */
export function useUrlFlag(flag: FeatureFlag): boolean | undefined {
  const params = useSearchParams();
  const value = params?.get(`ff_${flag}`);
  if (value === null) return undefined;
  return value === "1" || value.toLowerCase() === "true";
}
