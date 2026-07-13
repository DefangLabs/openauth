# Multi-tenant agent identity issuer

Design for adding OIDC-issuer-as-key-registry capability to OpenAuth so AI agents can authenticate to cloud APIs (Azure / AWS / GCP) via short-lived, federation-exchanged tokens — without long-lived cloud credentials sitting on the agent host.

## Problem

AI coding agents (Claude Code, Cursor, Cline, internal corp agents) that need to provision or manage cloud infra hit a credentials wall: either hold long-lived cloud creds (bad), or build a per-integration broker (lots of work, doesn't transfer between clouds). GitHub Actions OIDC solved this for CI workloads. Agents running on dev laptops, long-lived VMs, or arbitrary infra don't have an equivalent.

The fix: a neutral OIDC issuer that:

1. Holds **only public keys** registered by agent owners. Private keys never touch the issuer.
2. Publishes a standards-compliant JWKS + discovery doc per tenant.
3. Cloud admins configure a one-time trust relationship per tenant; agents thereafter sign their own JWTs locally and exchange them at each cloud's federated-credential endpoint for short-lived cloud access tokens.

Defang's existing OpenAuth deployment already provides OAuth provider semantics. This doc covers what's needed to bolt agent-key registration + OIDC discovery + per-tenant isolation on top.

## Goals

- Agent owners register public keys for their agents against a tenant they control.
- Agents sign JWTs with their private keys (never sent to Defang) and exchange via Azure / AWS / GCP federated credentials for short-lived cloud tokens.
- Multi-tenant from day one: each tenant gets a unique issuer URL (`tenantxyz.auth.defang.io`), unique JWKS, unique trust configs in customer clouds. Tenant A cannot mint or be confused with tenant B.
- Registration is authenticated via OpenAuth's existing flow — bearer token from the standard `/token` endpoint.
- Backward-compatible: existing OpenAuth deployments (single-tenant, end-user auth) continue to work unchanged. New behavior is opt-in.

## Non-goals (for the spike)

- Real production tenant onboarding (org creation, billing, quotas) — single-tenant or two-tenant test setup is enough.
- A management UI — registration is REST-only; UI is a later layer.
- Token-exchange RFC 8693 — agents do raw JWT signing and per-cloud federation. Issuer never mints workload tokens.
- Wildcard / on-demand TLS for tenant subdomains — spike uses two enumerated subdomains, named in the Caddy config.
- Policy engine for key publication (budget gates, anomaly-driven revocation) — out of scope for the spike, in scope for the eventual product.

## Tenant resolution

**Mechanism:** host-header-driven, resolved by middleware that runs before any tenant-scoped handler.

```
GET /.well-known/openid-configuration HTTP/1.1
Host: tenant1.auth.defang.io
```

Middleware extracts the leading subdomain label, validates it against a configured tenant registry, and sets `c.var.tenant = { id, issuerURL, ... }`. Any tenant-scoped handler reads from `c.var.tenant`.

**Tenant registry** for the spike is a static map in config (`tenant1: { ... }, tenant2: { ... }`). Production: backed by storage, with admin endpoints to create/configure tenants.

**Unknown host → 404.** Never silently fall through to a default tenant. Better to fail closed.

**Issuer URL** is constructed from the resolved tenant, not from the incoming host header. Defends against host-header spoofing being used to influence the `iss` claim. Example: tenant registry says `tenant1` has canonical URL `https://tenant1.auth.defang.io`; that's what appears in discovery docs and tokens regardless of the actual `Host` value.

## Storage isolation

OpenAuth's existing storage interface (`packages/openauth/src/storage/storage.ts`) uses string keys. Tenant isolation is achieved by **prefixing every key with `tenant:<id>:`** in tenant-scoped code paths. Storage interface itself doesn't change.

Example keys:

```
tenant:tenant1:agent-key:<jwk-thumbprint>             — public key + metadata + (project, stack)
tenant:tenant1:project:<pid>:stack:<sid>:keys         — set of thumbprints registered for this (project, stack)
tenant:tenant1:user:<uid>:registered-keys             — user's list of thumbprints (for management UI)
```

The `tenant:tenant1:agent-key:<thumbprint>` record is the source of truth. The other two are indexes for efficient lookup. JWKS generation walks `agent-key:*` filtered by tenant and not-expired; key listing for a user walks `user:<uid>:registered-keys`.

Existing non-tenanted keys (`oauth:code:<code>`, etc.) are untouched. Tenanted handlers explicitly use the prefix-helper; untenanted handlers (the existing user-auth flow) keep using bare keys.

Helper: `tenantKey(c, ...parts)` → `tenant:<id>:` + parts joined with `:`. Required by every tenanted handler. Linting against bare storage calls in tenanted code paths is a follow-up.

## API surface

All endpoints are tenant-scoped (resolved by middleware from host header). **Tenant subdomains are an entirely separate namespace from `auth.defang.io`** — the host header alone disambiguates which behavior the request gets. No path-prefix gymnastics. Standard `.well-known` paths on a tenant subdomain serve only agent identity; the same paths on `auth.defang.io` continue to serve OpenAuth's existing portal/CLI auth, untouched.

Issuer URL for federation: `https://tenant1.auth.defang.io` (no trailing path).

### `GET /.well-known/openid-configuration` (on tenant subdomain)

OpenID Connect Discovery 1.0 doc. Minimal shape Azure / AWS / GCP federated credentials accept:

```json
{
  "issuer": "https://tenant1.auth.defang.io",
  "jwks_uri": "https://tenant1.auth.defang.io/.well-known/jwks.json",
  "response_types_supported": ["id_token"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256", "ES256", "EdDSA"],
  "claims_supported": ["sub", "aud", "iss", "exp", "iat"]
}
```

`issuer` comes from the tenant registry, not the request host. No `authorization_endpoint` / `token_endpoint` — agents don't authenticate against the issuer to mint tokens; they sign their own.

### `GET /.well-known/jwks.json` (on tenant subdomain)

Returns the tenant's agent JWKS: only currently-active agent-registered keys. Each entry has `kid`, `kty`, `use: "sig"`, key components, and `exp` if a TTL is set. Expired keys are filtered on read.

**No co-mingling with OpenAuth's own keys** — those live on `auth.defang.io/.well-known/jwks.json`, a different host entirely. Different threat models, different rotation cadences.

Cache-Control: `public, max-age=300`. Cloud STS impls cache JWKS for hours; the 5-min hint is for fresh fetches when keys are revoked or rotated.

### `POST /keys` (on tenant subdomain)

Register an agent's public key against the authenticated user's tenant.

**Auth:** Bearer token issued by OpenAuth's existing `/token` endpoint on `auth.defang.io` (standard OAuth flow). Token's claims identify the user and tenant. The tenant subdomain validates the token against `auth.defang.io`'s JWKS (cross-host JWKS fetch, cached).

**Body:**

```json
{
  "project_id": "playground",
  "stack_id": "staging",
  "jwk": { "kty": "RSA", "n": "...", "e": "AQAB" },
  "ttl_seconds": 86400,
  "pop_jwt": "eyJhbGc..."
}
```

`jwk` is the public key in JWK form. Server validates: `kty` in {RSA, EC, OKP}, key length within bounds, no `d` field (private component MUST NOT be present — reject if it is, since that would indicate the agent is leaking its private material).

**No customer-chosen kid.** `kid` is derived server-side from the JWK thumbprint (RFC 7638) — deterministic, unique per key, opaque to customers. Registration is idempotent: re-submitting the same JWK against the same `(project, stack)` returns the same kid with no duplicate JWKS entry.

**Same JWK across multiple `(project, stack)` pairs is REJECTED** with 409. Forces per-stack keypair generation. Otherwise stack isolation breaks: an attacker with the private key could mint JWTs claiming either stack's `sub` and the JWKS lookup would resolve to the same key.

**Proof of possession (`pop_jwt`):** A JWT signed by the agent with the private key being registered. Payload:

```json
{ "iat": 1719261000, "jwk_thumb": "<base64url thumbprint>" }
```

Server verifies: (a) signature is valid against the submitted `jwk`, (b) `iat` within ±5 minutes of server time, (c) `jwk_thumb` matches the server-computed thumbprint of the submitted JWK (prevents PoP replay across keys). No challenge-response round-trip, no server-side state.

**Effect:** Stores the JWK under `tenant:<tid>:agent-key:<thumbprint>`, with an index `tenant:<tid>:project:<pid>:stack:<sid>:keys` listing all kids for that (project, stack) pair. Subject (`sub`) is constructed server-side as:

```
defang:project:<project_id>:stack:<stack_id>
```

Workspace / tenant in `iss`. Key identity (kid) NOT in `sub` — the RP verifies the signature against the kid-resolved JWK, which is the per-key gate; `sub` only carries the stack-level identity. Cleaner trust configs, fewer permutations to maintain.

**Response:**

```json
{
  "kid": "MGJmM2I0...",
  "sub": "defang:project:playground:stack:staging",
  "issuer": "https://tenant1.auth.defang.io",
  "exp": 1719262080
}
```

The minted JWT puts `kid` in the JOSE header (for JWKS lookup) and `sub` in the payload (for trust-config matching).

### `GET /keys` (on tenant subdomain)

List keys registered by the authenticated user within the current tenant. Used for management UI / CLI.

### `DELETE /keys/:kid` (on tenant subdomain)

Revoke. Removes the key from JWKS immediately. Per-agent revocation lives here: even though `sub` doesn't differentiate agents, the per-key delete is the right granularity for "this agent is compromised." Outstanding cloud access tokens already minted via this key remain valid until they expire (~1 hour) — Azure/AWS/GCP don't validate against JWKS on token use, only at federation time.

## Subject claim convention

```
defang:project:<project_id>:stack:<stack_id>
```

- **Workspace/tenant** in `iss`, not in `sub`.
- **Stack** in `sub` — stacks are Defang's natural cloud-permission boundary, and trust-config string match works uniformly across all clouds.
- **Labeled segments (`project:`, `stack:`), not positional (`defang:<pid>:<sid>`).** The sub schema is frozen the moment customers write trust configs against it — those live in customer cloud accounts and can't be migrated from our side. Labels are self-describing, so future identity shapes (org-level, user-scoped) can coexist without making `defang:a:b` ambiguous, and wildcard trust configs document their own blast radius: `defang:project:*` visibly grants "any project" where the positional `defang:*` says nothing. Same road GitHub Actions (`repo:owner/name:ref:…`) and GitLab OIDC took. Cloud wildcards are greedy (`*` matches `:` too) — one more reason never to append segments after `stack:`.
- **Key identity (kid) is NOT in sub.** The relying party (cloud STS) finds the right public key via the JWT header `kid`, then verifies the signature — that's the per-key gate. `sub` is the identity assertion the trust config matches, and at the granularity Defang customers actually want to manage, that's `(project, stack)`, not `(project, stack, individual-agent)`.

A customer writing an Azure federated credential trust config:

```
issuer:   https://tenant1.auth.defang.io
subject:  defang:project:playground:stack:staging
audience: api://AzureADTokenExchange
```

Scopes to a specific (tenant, project, stack) triple. Any registered agent key for that triple can mint passing JWTs; per-agent revocation is via `DELETE /keys/:kid` rather than per-agent trust configs. If you genuinely need different cloud permissions for different agents, split them into separate stacks.

### Per-cloud trust config notes

- **Azure** uses issuer URL + literal subject string (or wildcard suffix). Federated credential goes on an App Registration. Issuer: `https://tenant1.auth.defang.io`. `aud=api://AzureADTokenExchange`.
- **AWS STS** uses an IAM identity provider (OIDC IdP) + a role trust policy referencing issuer and `sub` (via `Condition`). Issuer registered as `https://tenant1.auth.defang.io`. `aud=sts.amazonaws.com`.
- **GCP** uses Workload Identity Federation: an Identity Pool with an OIDC provider referencing the issuer URL, then attribute mappings from `sub` to a service account. `aud=https://iam.googleapis.com/projects/.../workloadIdentityPools/.../providers/...`.

Each cloud has different `aud` conventions. The agent CLI MUST allow the user to specify `--audience` to match what their cloud expects.

## Auth model for registration

OpenAuth already issues bearer tokens via `/token` for end-user auth flows (GitHub provider, password provider, etc). Agent-key registration uses the same tokens.

**Flow:**
1. User logs into the tenant via OpenAuth's existing UI (or programmatic flow).
2. User obtains an access token whose `sub` identifies them within the tenant.
3. User POSTs to `/agent-keys` with `Authorization: Bearer <token>`.
4. Handler validates token (signature against tenant's JWKS, exp, aud), extracts user identity, stores key under `tenant:<tid>:agent-key:<sub>` with `owner=<user-sub>`.

For the spike: a single hard-coded `password` provider user per tenant, logged in via CLI. No UI required.

## Key lifecycle

- **Registration**: as above. Sets `exp` from `ttl_seconds` if provided, else null (= no expiration).
- **Rotation**: agent generates new keypair, registers as new `key_id`, optionally deletes the old one. No in-place mutation; mutation = delete + create.
- **Revocation**: `DELETE /agent-keys/:kid`. Immediately removed from JWKS. Pre-existing cloud access tokens remain valid until their own short expiry.
- **Auto-expiry**: keys with `exp < now()` are filtered out of the JWKS response. (Avoids needing a sweeper for the spike — lazy cleanup on read is fine.)

## Test plan

1. **Single-tenant happy path.** Spin up OpenAuth with tenant1 configured. Generate keypair locally. Register public key. Confirm it appears in `/.well-known/jwks.json` for tenant1. Mint a JWT signed with the private key. Validate offline using the JWKS fetched from tenant1.
2. **Two-tenant isolation.** Spin up with tenant1 + tenant2. Register key under tenant1. Confirm it appears in tenant1's JWKS but NOT in tenant2's. Confirm `iss` and `jwks_uri` in tenant2's discovery doc do not reference tenant1.
3. **Host header spoofing defense.** Send a request with `Host: tenant2.auth.defang.io` but a body referencing tenant1 in any way. Confirm the issuer claim and storage scope follow the resolved tenant (tenant2), not anything in the body.
4. **Azure federation end-to-end.** Lio creates an Azure App Registration with a federated credential pointing at issuer `https://tenant1.auth-spike.nixos.defang.ca`, sub `defang:project:playground:stack:staging`, aud `api://AzureADTokenExchange`. Run mint script + exchange script + `curl https://management.azure.com/subscriptions/.../resourceGroups?api-version=2021-04-01`. Expect HTTP 200 with the RG list.
5. **Negative: wrong sub.** Mint with `sub=defang:project:playground:stack:prod` against the staging trust config. Exchange fails at Azure with subject mismatch error. Proves stack isolation at the federation layer.
6. **Negative: missing key.** Mint with a key NOT registered in JWKS. Exchange fails at Azure with signature validation error (kid not found in JWKS, or signature mismatch).
7. **PoP rejection.** Register a JWK without a matching `pop_jwt`, or with a `pop_jwt` signed by a different private key. Registration request fails with 400. Proves PoP gate actually works.
8. **Same-key cross-stack rejection.** Try to register the same JWK against `(project:foo, stack:staging)` and then `(project:foo, stack:prod)`. Second registration fails with 409. Proves stack isolation can't be circumvented by key reuse.

## Caddy / DNS for the spike

Use the existing wildcard `*.nixos.defang.ca` already on this NixOS box. Two tenants:

```
tenant1.auth-spike.nixos.defang.ca {
  import acme_alpn_only
  reverse_proxy 127.0.0.1:4000
}

tenant2.auth-spike.nixos.defang.ca {
  import acme_alpn_only
  reverse_proxy 127.0.0.1:4000
}
```

Both point at the same local OpenAuth instance; tenant routing happens inside OpenAuth via the Host header. Same TLS-ALPN-01 pattern as the rest of the playground (no port 80 needed).

## Changes to OpenAuth core

File-level:

- **`packages/openauth/src/issuer.ts`** (modified). Add:
  - Tenant-resolving middleware that reads the host header against the tenant registry. On `auth.defang.io` (apex / non-tenant host), behavior is unchanged. On `*.auth.defang.io`, route to agent-identity handlers.
  - When tenant context is set, the existing `/.well-known/openid-configuration` and `/.well-known/jwks.json` handlers are replaced with tenant-scoped agent-identity versions. The bare-path routes `/keys` etc. are added.
  - No changes to OpenAuth's behavior on `auth.defang.io` — agent identity is purely additive at the host level.
- **`packages/openauth/src/tenant.ts`** (new). Types + helpers for the tenant registry, storage prefixing, host-header middleware, cross-host bearer-token validation against `auth.defang.io`'s JWKS.
- **`packages/openauth/src/agents/keys.ts`** (new). JWK validation (reject `d`, validate `kty`/length), JWK-thumbprint kid derivation (RFC 7638), PoP-JWT verification, cross-stack duplicate-key check, storage interface.
- **`packages/openauth/src/agents/discovery.ts`** (new). OIDC discovery doc + JWKS endpoint handlers for tenant subdomains.
- **`examples/issuer/bun/issuer.ts`** (extended). New example wiring up a 2-tenant config for the spike.
- **`packages/openauth/test/agents/`** (new). Tests covering the test plan above, including PoP verification, tenant isolation, and same-key cross-stack rejection.

Estimated diff: ~700–1000 LoC across the additions, ~30–60 LoC of changes to existing `issuer.ts` (mostly tenant middleware + host-conditional handler selection).

## Resolved decisions (from 2026-06-23 review)

1. **Host-based separation, not path.** Tenant subdomain alone is the namespace; standard `.well-known` paths on `tenant1.auth.defang.io` serve only agent identity, while `auth.defang.io` keeps OpenAuth's existing OAuth provider behavior untouched. Same OpenAuth deployment, host-header-routed.
2. **PoP via signed timestamp at registration.** Agent supplies a JWT `{ iat, jwk_thumb }` signed with the private key alongside the public JWK. Server verifies signature + iat freshness + thumb match. No challenge-response round-trip, no server-side state.
3. **No per-tenant OpenAuth signing keys.** OpenAuth's keys are for portal/CLI identity, different blast radius and lifecycle.
4. **Tenant config in OpenAuth's existing storage abstraction.** Production backing: Redis or Postgres (already in portal). Spike: static map in the example config; storage interface is the swap point.
5. **Stack in `sub`, kid NOT in `sub`.** Subject is `defang:project:<pid>:stack:<sid>`. RP verifies signature against the kid-resolved key (per-key gate); `sub` carries the stack-level identity (trust-config gate). Per-agent revocation is via JWKS deletion, not per-agent sub matching.
6. **Kid auto-derived from JWK thumbprint.** RFC 7638. Customers never pick a kid. Registration is idempotent for the same JWK; same JWK across multiple `(project, stack)` is rejected with 409 to preserve stack isolation.

## Open questions

1. **Fleet-wide agent UX.** Agents that legitimately need to act across many stacks (e.g., a CI runner that deploys to staging + prod) must generate one keypair per stack and register each. Should the registration endpoint support a bulk operation `POST /keys/bulk` that takes an array of `(project_id, stack_id, jwk, pop_jwt)` triples, to reduce client-side complexity? Or is per-pair registration fine?
2. **JWKS rotation signaling.** When an agent rotates its key (registers new, then deletes old), there's a brief window where cloud STS may still cache the old JWKS. Should the JWKS response include a tighter `Cache-Control: max-age=60` for tenants with recent rotation activity? Or is the 5-min default + clouds' own behavior acceptable?
3. **Bearer-token validation across hosts.** Registration on `tenant1.auth.defang.io` validates a bearer token issued by `auth.defang.io`. That means the tenant subdomain fetches `auth.defang.io/.well-known/jwks.json` to verify, and matches the token's tenant claim to the current host. Need to confirm OpenAuth's existing tokens carry a tenant/workspace claim, or design how that's derived (e.g., user → workspace lookup in storage).

## Sequencing

1. This doc → review → iterate.
2. Implement tenant middleware + storage prefixing on the branch.
3. Implement OIDC discovery + JWKS extension.
4. Implement agent-key registration + auth gate.
5. Tests for tenant isolation (test plan items 1–3 + 5 + 6).
6. Caddy config + DNS for spike.
7. Lio: Azure App Registration + federated credential setup.
8. Agent CLI (keygen, register, mint, exchange) in a separate repo (`defang-agent-cli/`?) — pulls JWKS from OpenAuth, signs locally, exchanges with Azure. ~150 LoC.
9. End-to-end test (test plan item 4).
