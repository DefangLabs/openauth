import { codeProvider } from "./code"
import { githubProvider } from "./github"

export const providers = {
    github: githubProvider,
    /**
     * Personally a big fan one-time code auth. Means I can use arbitrary email addresses and
     * still be comfortable that I don't need to remember a password.
     */
    code: codeProvider,
} as const;

export const enabledPoviders = Object.keys(providers) as Array<keyof typeof providers>

export type EnabledProviders = keyof typeof providers