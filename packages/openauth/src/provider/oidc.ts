/**
 * Use this to connect authentication providers that support OIDC.
 *
 * ```ts {5-8}
 * import { OidcProvider } from "@openauthjs/openauth/provider/oidc"
 *
 * export default issuer({
 *   providers: {
 *     oauth2: OidcProvider({
 *       clientId: "1234567890",
 *       issuer: "https://auth.myserver.com"
 *     })
 *   }
 * })
 * ```
 *
 *
 * @packageDocumentation
 */

import { createLocalJWKSet, JSONWebKeySet, jwtVerify } from "jose"
import { WellKnown } from "../client.js"
import { OauthError } from "../error.js"
import { Provider } from "./provider.js"
import { JWTPayload } from "hono/utils/jwt/types"
import { getRelativeUrl, lazy } from "../util.js"
import { verify } from "crypto"

interface ResponseLike {
  json(): Promise<unknown>
  ok: Response["ok"]
  text(): Promise<string>
}
type FetchLike = (...args: any[]) => Promise<ResponseLike>

export interface OidcConfig {
  /**
   * @internal
   */
  type?: string
  /**
   * The client ID.
   *
   * This is just a string to identify your app.
   *
   * @example
   * ```ts
   * {
   *   clientID: "my-client"
   * }
   * ```
   */
  clientID: string
  /**
   * The URL of your authorization server.
   *
   * @example
   * ```ts
   * {
   *   issuer: "https://auth.myserver.com"
   * }
   * ```
   */
  issuer: string
  /**
   * A list of OIDC scopes that you want to request.
   *
   * @example
   * ```ts
   * {
   *   scopes: ["openid", "profile", "email"]
   * }
   * ```
   */
  scopes?: string[]
  /**
   * The expected audience for JWT verification.
   * If not provided, defaults to clientID.
   *
   * @example
   * ```ts
   * {
   *   audience: "https://github.com/owner/repo"
   * }
   * ```
   */
  audience?: string
  /**
   * Any additional parameters that you want to pass to the authorization endpoint.
   * @example
   * ```ts
   * {
   *   query: {
   *     prompt: "consent"
   *   }
   * }
   * ```
   */
  query?: Record<string, string>

  /**
   * Optionally, override the internally used fetch function.
   *
   * This is useful if you are using a polyfilled fetch function in your application and you
   * want the client to use it too.
   */
  fetch?: FetchLike
}

/**
 * @internal
 */
export type OidcWrappedConfig = Omit<OidcConfig, "issuer" | "name">

interface ProviderState {
  state: string
  nonce: string
  redirect: string
}

/**
 * @internal
 */
export interface IdTokenResponse {
  idToken: string
  claims: Record<string, any>
  raw: Record<string, any>
}

export interface OidcProvider<Properties = any> extends Provider<Properties> {
  issuer: string
  verifyIdToken: (
    id_token: string,
  ) => Promise<{ payload: JWTPayload; protectedHeader: Record<string, any> }>
}

export function OidcProvider(
  config: OidcConfig,
): OidcProvider<{ id: JWTPayload; clientID: string }> {
  const query = config.query || {}
  const scopes = config.scopes || []
  const f = config.fetch || fetch

  const wk = lazy(() =>
    f(config.issuer + "/.well-known/openid-configuration").then(async (r) => {
      if (!r.ok) throw new Error(await r.text())
      return r.json() as Promise<WellKnown>
    }),
  )

  const jwks = lazy(() =>
    wk()
      .then((r) => r.jwks_uri)
      .then(async (uri) => {
        const r = await f(uri)
        if (!r.ok) throw new Error(await r.text())
        return createLocalJWKSet((await r.json()) as JSONWebKeySet)
      }),
  )

  const verifyIdToken = async (id_token: string) => {
    console.log("Verifying ID token with config:", config);
    const verifyOptions: any = {
      issuer: config.issuer,
    }

    // Only include audience validation if audience is specified
    if (config.audience) {
      verifyOptions.audience = config.audience
    }

    return jwtVerify(id_token, await jwks(), verifyOptions)
  }

  return {
    type: config.type || "oidc",
    issuer: config.issuer,
    init(routes, ctx) {
      routes.get("/authorize", async (c) => {
        const provider: ProviderState = {
          state: crypto.randomUUID(),
          nonce: crypto.randomUUID(),
          redirect: getRelativeUrl(c, "./callback"),
        }
        await ctx.set(c, "provider", 60 * 10, provider)
        const authorization = new URL(
          await wk().then((r) => r.authorization_endpoint),
        )
        authorization.searchParams.set("client_id", config.clientID)
        authorization.searchParams.set("response_type", "id_token")
        authorization.searchParams.set("response_mode", "form_post")
        authorization.searchParams.set("state", provider.state)
        authorization.searchParams.set("nonce", provider.nonce)
        authorization.searchParams.set("redirect_uri", provider.redirect)
        authorization.searchParams.set("scope", ["openid", ...scopes].join(" "))
        for (const [key, value] of Object.entries(query)) {
          authorization.searchParams.set(key, value)
        }
        return c.redirect(authorization.toString())
      })

      routes.post("/callback", async (c) => {
        const provider = await ctx.get<ProviderState>(c, "provider")
        if (!provider) return c.redirect(getRelativeUrl(c, "./authorize"))
        const body = await c.req.formData()
        const error = body.get("error")
        if (error)
          throw new OauthError(
            error.toString() as any,
            body.get("error_description")?.toString() || "",
          )
        const idToken = body.get("id_token")
        if (!idToken)
          throw new OauthError("invalid_request", "Missing id_token")

        const result = await verifyIdToken(idToken.toString())
        if (result.payload.nonce !== provider.nonce) {
          throw new OauthError("invalid_request", "Invalid nonce")
        }
        return ctx.success(c, {
          id: result.payload,
          clientID: config.clientID,
        })
      })
    },
    verifyIdToken,
  }
}
