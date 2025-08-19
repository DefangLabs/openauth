/**
 * Use this provider to authenticate with Gitlab.
 *
 * ```ts {5-8}
 * import { GitlabProvider } from "@openauthjs/openauth/provider/gitlab"
 *
 * export default issuer({
 *   providers: {
 *     gitlab: GitlabProvider({
 *       clientId: "1234567890",
 *       clientSecret: "0987654321"
 *     })
 *   }
 * })
 * ```
 *
 * @packageDocumentation
 */

import { Oauth2Provider, Oauth2WrappedConfig } from "./oauth2.js"

export interface GitlabConfig extends Oauth2WrappedConfig {}

/**
 * Create a Gitlab OAuth2 provider.
 *
 * @param config - The config for the provider.
 * @example
 * ```ts
 * GitlabProvider({
 *   clientId: "1234567890",
 *   clientSecret: "0987654321"
 * })
 * ```
 */
export function GitlabProvider(config: GitlabConfig) {
  return Oauth2Provider({
    ...config,
    type: "gitlab",
    endpoint: {
      authorization: "https://gitlab.com/oauth/authorize",
      token: "https://gitlab.com/oauth/token",
    },
  })
}
