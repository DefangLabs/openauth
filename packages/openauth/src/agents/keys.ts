/**
 * Agent public-key registration. See `docs/agent-identity.md`.
 *
 * Agent owners register public keys (JWK) against a `(project, stack)` pair
 * within their tenant. The private key never leaves the agent; registration
 * requires a proof-of-possession JWT signed with it. Registered keys are
 * published in the tenant's JWKS for cloud federated-credential validation.
 *
 * @packageDocumentation
 */
import {
  calculateJwkThumbprint,
  importJWK,
  jwtVerify,
  errors,
  JWK,
} from "jose"
import { Storage, StorageAdapter } from "../storage/storage.js"
import { tenantKey } from "../tenant.js"

export class AgentKeyError extends Error {
  constructor(
    public status: 400 | 401 | 404 | 409,
    message: string,
  ) {
    super(message)
  }
}

export interface AgentKeyRecord {
  /** RFC 7638 JWK thumbprint, base64url — also the JWKS `kid`. */
  kid: string
  jwk: JWK
  alg: string
  projectID: string
  stackID: string
  /** `defang:project:<pid>:stack:<sid>` — the identity cloud trust configs match. */
  subject: string
  /** `sub` of the access token that registered the key. */
  owner: string
  created: number
  /** Epoch seconds; absent = no expiry. */
  exp?: number
}

const PRIVATE_JWK_FIELDS = ["d", "p", "q", "dp", "dq", "qi", "oth", "k"]
const EC_ALG: Record<string, string> = {
  "P-256": "ES256",
  "P-384": "ES384",
  "P-521": "ES512",
}
const ID = /^[a-zA-Z0-9._-]{1,64}$/
const POP_MAX_SKEW = 300

/**
 * Validate a public JWK and return the signing alg it implies. Rejects
 * anything carrying private key material — submitting it would mean the
 * agent is leaking its private key.
 */
export function validateJWK(jwk: JWK): string {
  if (!jwk || typeof jwk !== "object" || Array.isArray(jwk))
    throw new AgentKeyError(400, "jwk must be a JWK object")
  for (const field of PRIVATE_JWK_FIELDS) {
    if (field in jwk)
      throw new AgentKeyError(
        400,
        `jwk contains private key material ("${field}") — never send the private key; generate a new keypair and register only the public half`,
      )
  }
  switch (jwk.kty) {
    case "RSA": {
      if (!jwk.n || !jwk.e)
        throw new AgentKeyError(400, "RSA jwk requires n and e")
      // base64url length 342 ≈ 2048-bit modulus
      if (jwk.n.length < 342)
        throw new AgentKeyError(400, "RSA keys must be at least 2048 bits")
      if (jwk.n.length > 1024)
        throw new AgentKeyError(400, "RSA key too large")
      return typeof jwk.alg === "string" && jwk.alg.startsWith("RS")
        ? jwk.alg
        : "RS256"
    }
    case "EC": {
      if (!jwk.crv || !(jwk.crv in EC_ALG))
        throw new AgentKeyError(400, "EC jwk crv must be P-256, P-384 or P-521")
      if (!jwk.x || !jwk.y)
        throw new AgentKeyError(400, "EC jwk requires x and y")
      return EC_ALG[jwk.crv]
    }
    case "OKP": {
      if (jwk.crv !== "Ed25519")
        throw new AgentKeyError(400, "OKP jwk crv must be Ed25519")
      if (!jwk.x) throw new AgentKeyError(400, "OKP jwk requires x")
      return "EdDSA"
    }
    default:
      throw new AgentKeyError(400, "jwk kty must be RSA, EC or OKP")
  }
}

/**
 * Verify the proof-of-possession JWT: signed by the private half of `jwk`,
 * `iat` within ±5 minutes, `jwk_thumb` matching the server-computed
 * thumbprint (prevents PoP replay across keys).
 */
export async function verifyPop(
  popJwt: string,
  jwk: JWK,
  alg: string,
  thumbprint: string,
): Promise<void> {
  if (!popJwt || typeof popJwt !== "string")
    throw new AgentKeyError(400, "pop_jwt is required")
  let payload
  try {
    const key = await importJWK(jwk, alg)
    payload = (
      await jwtVerify(popJwt, key, {
        algorithms: [alg],
        clockTolerance: POP_MAX_SKEW,
      })
    ).payload
  } catch (e) {
    if (e instanceof errors.JOSEError)
      throw new AgentKeyError(
        400,
        "pop_jwt verification failed: not signed by the private key matching jwk",
      )
    throw e
  }
  const now = Math.floor(Date.now() / 1000)
  if (typeof payload.iat !== "number" || Math.abs(now - payload.iat) > POP_MAX_SKEW)
    throw new AgentKeyError(400, "pop_jwt iat missing or outside ±5 minutes")
  if (payload.jwk_thumb !== thumbprint)
    throw new AgentKeyError(400, "pop_jwt jwk_thumb does not match submitted jwk")
}

export interface RegisterInput {
  projectID: string
  stackID: string
  jwk: JWK
  popJwt: string
  ttlSeconds?: number
  owner: string
}

/**
 * Register a public key for `(project, stack)` in the tenant. Idempotent for
 * the same JWK + pair; the same JWK against a different pair is rejected
 * with 409 so stack isolation can't be circumvented by key reuse.
 */
export async function registerAgentKey(
  storage: StorageAdapter,
  tenantID: string,
  input: RegisterInput,
): Promise<AgentKeyRecord> {
  if (!ID.test(input.projectID ?? ""))
    throw new AgentKeyError(400, "project_id must match " + ID.source)
  if (!ID.test(input.stackID ?? ""))
    throw new AgentKeyError(400, "stack_id must match " + ID.source)
  if (
    input.ttlSeconds !== undefined &&
    (!Number.isInteger(input.ttlSeconds) || input.ttlSeconds <= 0)
  )
    throw new AgentKeyError(400, "ttl_seconds must be a positive integer")
  const alg = validateJWK(input.jwk)
  const kid = await calculateJwkThumbprint(input.jwk)
  await verifyPop(input.popJwt, input.jwk, alg, kid)

  const key = tenantKey(tenantID, "agent-key", kid)
  const existing = await Storage.get<AgentKeyRecord>(storage, key)
  if (existing) {
    if (
      existing.projectID !== input.projectID ||
      existing.stackID !== input.stackID
    )
      throw new AgentKeyError(
        409,
        `key already registered for project "${existing.projectID}" stack "${existing.stackID}" — generate a distinct keypair per (project, stack)`,
      )
    return existing
  }

  const record: AgentKeyRecord = {
    kid,
    jwk: {
      ...input.jwk,
      kid,
      use: "sig",
      alg,
    },
    alg,
    projectID: input.projectID,
    stackID: input.stackID,
    subject: agentSubject(input.projectID, input.stackID),
    owner: input.owner,
    created: Math.floor(Date.now() / 1000),
    exp: input.ttlSeconds
      ? Math.floor(Date.now() / 1000) + input.ttlSeconds
      : undefined,
  }
  await Storage.set(storage, key, record, input.ttlSeconds)
  await Storage.set(
    storage,
    tenantKey(tenantID, "user", input.owner, "key", kid),
    { kid },
    input.ttlSeconds,
  )
  return record
}

export function agentSubject(projectID: string, stackID: string) {
  return `defang:project:${projectID}:stack:${stackID}`
}

function expired(record: AgentKeyRecord) {
  return record.exp !== undefined && record.exp <= Math.floor(Date.now() / 1000)
}

/** Keys registered by `owner` within the tenant. */
export async function listAgentKeys(
  storage: StorageAdapter,
  tenantID: string,
  owner: string,
): Promise<AgentKeyRecord[]> {
  const results: AgentKeyRecord[] = []
  for await (const [, value] of Storage.scan<{ kid: string }>(
    storage,
    tenantKey(tenantID, "user", owner, "key"),
  )) {
    const record = await Storage.get<AgentKeyRecord>(
      storage,
      tenantKey(tenantID, "agent-key", value.kid),
    )
    if (record && !expired(record)) results.push(record)
  }
  return results
}

/**
 * Revoke a key: removed from the JWKS immediately. Cloud access tokens
 * already exchanged remain valid until their own expiry — clouds validate
 * against the JWKS at federation time only.
 */
export async function revokeAgentKey(
  storage: StorageAdapter,
  tenantID: string,
  owner: string,
  kid: string,
): Promise<void> {
  const key = tenantKey(tenantID, "agent-key", kid)
  const record = await Storage.get<AgentKeyRecord>(storage, key)
  if (!record || record.owner !== owner)
    throw new AgentKeyError(404, "key not found")
  await Storage.remove(storage, key)
  await Storage.remove(storage, tenantKey(tenantID, "user", owner, "key", kid))
}

/** The tenant's JWKS: currently-active agent keys only. */
export async function agentJWKS(
  storage: StorageAdapter,
  tenantID: string,
): Promise<{ keys: JWK[] }> {
  const keys: JWK[] = []
  for await (const [, record] of Storage.scan<AgentKeyRecord>(
    storage,
    tenantKey(tenantID, "agent-key"),
  )) {
    if (expired(record)) continue
    keys.push({ ...record.jwk, exp: record.exp } as JWK)
  }
  return { keys }
}
