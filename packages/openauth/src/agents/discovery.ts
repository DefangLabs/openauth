/**
 * OIDC discovery for tenant subdomains. See `docs/agent-identity.md`.
 *
 * The discovery document is the minimal shape Azure / AWS / GCP federated
 * credentials accept. There is deliberately no `authorization_endpoint` or
 * `token_endpoint`: agents don't authenticate against the issuer to mint
 * tokens — they sign JWTs locally and the clouds validate them against the
 * tenant's JWKS.
 *
 * @packageDocumentation
 */

/**
 * OpenID Connect Discovery 1.0 document for a tenant. `issuer` comes from
 * the tenant registry, never from the request host.
 */
export function discoveryDocument(issuer: string) {
  return {
    issuer,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    response_types_supported: ["id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: [
      "RS256",
      "RS384",
      "RS512",
      "ES256",
      "ES384",
      "ES512",
      "EdDSA",
    ],
    claims_supported: ["sub", "aud", "iss", "exp", "iat"],
  }
}

/**
 * Cloud STS implementations cache JWKS on their own schedule; the 5 minute
 * hint keeps fresh fetches reasonably current after a revocation.
 */
export const JWKS_CACHE_CONTROL = "public, max-age=300"
