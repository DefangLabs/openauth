import { githubProvider } from "./github";
import { gitlabProvider } from "./gitlab";

export const providers = {
  github: githubProvider,
  gitlab: gitlabProvider,
  /**
   * Personally a big fan one-time code auth. Means I can use arbitrary email addresses and
   * still be comfortable that I don't need to remember a password.
   */
  // code: codeProvider,
} as const;

export const enabledProviders = Object.keys(providers) as Array<
  keyof typeof providers
>;

export type EnabledProviders = keyof typeof providers;
