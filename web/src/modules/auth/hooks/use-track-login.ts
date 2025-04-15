import { analytics } from "@/modules/analytics/lib/analytics";
import { EVENTS } from "@/modules/analytics/lib/constants";
import { useCallback } from "react";
import { unsetLoginCompleteCookie } from "../actions/actions";
import { loginCompleteCookie } from "../constants";

/**
 * We do this client-side because we want Google Ads
 * to be able to track mark this as a conversion.
 */
export function useTrackLogin() {
  const trackLogin = useCallback(async () => {
    // first check if the login complete cookie exists
    // if it doesn't, then don't do anything
    if (!document.cookie.includes(loginCompleteCookie)) {
      return;
    }
    // if it does, then track the login
    // and remove the cookie
    analytics.track(EVENTS.login);
    const success = await unsetLoginCompleteCookie();
  }, []);

  return {
    trackLogin,
  };
}
