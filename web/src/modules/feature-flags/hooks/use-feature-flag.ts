"use client";

import { useEffect, useState } from "react";
import { FeatureFlag, isFeatureEnabled } from "../feature-flags";
import { useUrlFlag } from "./use-url-flag";

/**
 * React hook to read the value of a feature flag.
 *
 * Evaluation order (same as `isFeatureEnabled`): default → localStorage → URL.
 *
 * The hook listens for `storage` events so that toggling a flag in one tab is
 * propagated to all open tabs.
 */
export function useFeatureFlag(flag: FeatureFlag) {
  const urlOverride = useUrlFlag(flag);
  const [enabled, setEnabled] = useState(() =>
    urlOverride ?? isFeatureEnabled(flag),
  );

  useEffect(() => {
    // Re-evaluate on mount or when the URL flag changes in case SSR value
    // differs on the client or a query parameter is provided.
    setEnabled(urlOverride ?? isFeatureEnabled(flag));

    function handleStorage(e: StorageEvent) {
      if (e.key === `ff_${flag}`) {
        setEnabled(isFeatureEnabled(flag));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [flag, urlOverride]);

  return urlOverride ?? enabled;
}
