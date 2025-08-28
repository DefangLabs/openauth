// -------------------------------------------------------------
// Feature flagging utility
// -------------------------------------------------------------
// This module centralises feature flag definitions and exposes
// a single helper to determine whether a flag is enabled.
//
// Evaluation order (lowest → highest precedence):
// 1. Built-in defaults defined in DEFAULT_FEATURE_FLAGS
// 2. LocalStorage item  `ff_<flag>` (persisted per-browser)
// -------------------------------------------------------------

export type FeatureFlag = keyof typeof DEFAULT_FEATURE_FLAGS;

/**
 * Add new feature flags here. Keep the list alphabetically sorted. All new
 * flags **must** have an explicit default to avoid undefined behaviour.
 */
export const DEFAULT_FEATURE_FLAGS = {
  /**
   * Controls visibility of the tenant switcher UI. When disabled the app will
   * still load tenants in the background (for permissions) but will *not*
   * render the dropdown nor the "Create tenant" link.
   */
  TENANT_SWITCHER: false,
} as const satisfies Record<string, boolean>;

const LS_PREFIX = "ff_";

function readFlagFromLocalStorage(flag: FeatureFlag): boolean | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const value = window.localStorage.getItem(`${LS_PREFIX}${flag}`);
    if (value === null) return undefined;
    return value === "1" || value.toLowerCase() === "true";
  } catch {
    // SSR or user has disabled storage access → ignore silently
    return undefined;
  }
}

/**
 * Determine if a feature flag is enabled. This function is completely side-
 * effect free and may be used in both server and client components.
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  // Highest precedence: localStorage
  const fromStorage = readFlagFromLocalStorage(flag);
  if (typeof fromStorage === "boolean") return fromStorage;

  // Fallback to defaults
  return DEFAULT_FEATURE_FLAGS[flag];
}

/**
 * Persist a flag value to localStorage so that subsequent reloads keep the
 * choice. Intended mainly for QA toggling.
 */
export function setFeatureFlag(flag: FeatureFlag, enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${LS_PREFIX}${flag}`, String(enabled));
  } catch {
    // no-op
  }
}
