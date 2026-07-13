/**
 * Multi-tenant agent identity support. See `docs/agent-identity.md`.
 *
 * A tenant is a namespace for agent-registered public keys, addressed by a
 * subdomain whose leading label is the tenant ID:
 *
 * ```
 * https://tenant1.auth.example.com   → tenant "tenant1"
 * ```
 *
 * The issuer URL is always constructed from the resolved tenant registry
 * entry, never from the incoming host header, so a spoofed `Host` cannot
 * influence the `iss` claim or the storage scope.
 *
 * @packageDocumentation
 */

/**
 * A resolved tenant. Available to tenant-scoped handlers as `c.var.tenant`.
 */
export interface Tenant {
  /** Tenant ID — the leading subdomain label. */
  id: string
  /** Canonical issuer URL, e.g. `https://tenant1.auth.example.com`. */
  issuer: string
}

export interface TenantsInput {
  /**
   * Base domain under which tenant subdomains live, e.g.
   * `auth.example.com`. A request for `tenant1.auth.example.com` resolves
   * tenant `tenant1`; a request for an unregistered subdomain of this domain
   * is rejected (fail closed); any other host falls through to the normal
   * OpenAuth behavior.
   */
  domain: string
  /**
   * Tenant registry, keyed by tenant ID (= subdomain label). For the spike
   * this is a static map; production would back it with storage.
   */
  tenants: Record<
    string,
    {
      /**
       * Override the canonical issuer URL. Defaults to
       * `https://<id>.<domain>`.
       */
      issuer?: string
    }
  >
}

export type TenantResolution =
  | { kind: "tenant"; tenant: Tenant }
  | { kind: "unknown-tenant" }
  | { kind: "not-tenant" }

const LABEL = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/

/**
 * Resolve a host header against the tenant registry. The host is compared
 * case-insensitively and any port is ignored.
 */
export function resolveTenant(
  input: TenantsInput,
  host: string | undefined,
): TenantResolution {
  if (!host) return { kind: "not-tenant" }
  const hostname = host.split(":")[0].toLowerCase()
  const domain = input.domain.toLowerCase()
  if (!hostname.endsWith("." + domain)) return { kind: "not-tenant" }
  const label = hostname.slice(0, -(domain.length + 1))
  // Only a single label directly under the base domain names a tenant.
  if (!LABEL.test(label)) return { kind: "not-tenant" }
  const entry = input.tenants[label]
  if (!entry) return { kind: "unknown-tenant" }
  return {
    kind: "tenant",
    tenant: {
      id: label,
      issuer: entry.issuer ?? `https://${label}.${domain}`,
    },
  }
}

/**
 * Storage key prefix for tenant-scoped records. Every tenanted handler MUST
 * build its keys through this helper; untenanted handlers keep using bare
 * keys, so the existing user-auth flow is unaffected.
 */
export function tenantKey(tenantID: string, ...parts: string[]): string[] {
  return ["tenant", tenantID, ...parts]
}
