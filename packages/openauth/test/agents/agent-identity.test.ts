import { expect, test, describe, beforeEach } from "bun:test"
import { object, string } from "valibot"
import {
  calculateJwkThumbprint,
  createLocalJWKSet,
  exportJWK,
  generateKeyPair,
  jwtVerify,
  SignJWT,
} from "jose"
import { issuer } from "../../src/issuer.js"
import { createSubjects } from "../../src/subject.js"
import { MemoryStorage } from "../../src/storage/memory.js"
import { Provider } from "../../src/provider/provider.js"

const subjects = createSubjects({
  user: object({
    userID: string(),
  }),
})

const DOMAIN = "auth.example.com"
const TENANT1 = `https://tenant1.${DOMAIN}`
const TENANT2 = `https://tenant2.${DOMAIN}`

let app: ReturnType<typeof issuer>

beforeEach(() => {
  app = issuer({
    subjects,
    storage: MemoryStorage(),
    allow: async () => true,
    tenants: {
      domain: DOMAIN,
      tenants: {
        tenant1: {},
        tenant2: {},
      },
    },
    providers: {
      dummy: {
        type: "dummy",
        init() {},
        client: async () => ({ email: "foo@bar.com" }),
      } satisfies Provider<{ email: string }>,
    },
    success: async (ctx) => ctx.subject("user", { userID: "123" }),
  })
})

async function accessToken() {
  const response = await app.request("https://auth.example.com/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      provider: "dummy",
      client_id: "myuser",
      client_secret: "mypass",
    }),
  })
  expect(response.status).toBe(200)
  return (await response.json()).access_token as string
}

// app.request() Requests carry no Host header; the middleware falls back to
// x-forwarded-host, which is also what Caddy would set.
function tenantHost(host: string, extra?: Record<string, string>) {
  return { "x-forwarded-host": host, ...extra }
}

async function newAgentKey(alg: "ES256" | "RS256" = "ES256") {
  const pair = await generateKeyPair(alg, { extractable: true })
  const jwk = await exportJWK(pair.publicKey)
  const thumbprint = await calculateJwkThumbprint(jwk)
  return { ...pair, alg, jwk, thumbprint }
}

async function popJwt(
  key: Awaited<ReturnType<typeof newAgentKey>>,
  overrides?: { signWith?: CryptoKey; iat?: number; thumb?: string },
) {
  return new SignJWT({ jwk_thumb: overrides?.thumb ?? key.thumbprint })
    .setIssuedAt(overrides?.iat)
    .setProtectedHeader({ alg: key.alg })
    .sign(overrides?.signWith ?? key.privateKey)
}

async function register(
  host: string,
  token: string,
  body: Record<string, unknown>,
) {
  return app.request(`https://${host}/keys`, {
    method: "POST",
    headers: tenantHost(host, {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    }),
    body: JSON.stringify(body),
  })
}

async function registerOk(host: string, token: string, key: any, body = {}) {
  const response = await register(host, token, {
    project_id: "playground",
    stack_id: "staging",
    jwk: key.jwk,
    pop_jwt: await popJwt(key),
    ...body,
  })
  expect(response.status).toBe(200)
  return response.json()
}

async function jwks(host: string) {
  const response = await app.request(`https://${host}/.well-known/jwks.json`, {
    headers: tenantHost(host),
  })
  expect(response.status).toBe(200)
  return response.json()
}

describe("discovery", () => {
  test("tenant discovery doc uses canonical issuer from the registry", async () => {
    const response = await app.request(
      `https://tenant1.${DOMAIN}/.well-known/openid-configuration`,
      { headers: tenantHost(`tenant1.${DOMAIN}`) },
    )
    expect(response.status).toBe(200)
    const doc = await response.json()
    expect(doc.issuer).toBe(TENANT1)
    expect(doc.jwks_uri).toBe(`${TENANT1}/.well-known/jwks.json`)
    expect(doc.authorization_endpoint).toBeUndefined()
    expect(doc.token_endpoint).toBeUndefined()
  })

  test("unknown tenant subdomain fails closed with 404", async () => {
    const response = await app.request(
      `https://nosuch.${DOMAIN}/.well-known/openid-configuration`,
      { headers: tenantHost(`nosuch.${DOMAIN}`) },
    )
    expect(response.status).toBe(404)
  })

  test("non-agent-identity routes 404 on tenant hosts", async () => {
    for (const path of ["/token", "/authorize", "/userinfo", "/.well-known/oauth-authorization-server"]) {
      const response = await app.request(`https://tenant1.${DOMAIN}${path}`, {
        headers: tenantHost(`tenant1.${DOMAIN}`),
      })
      expect(response.status).toBe(404)
    }
  })

  test("apex host keeps existing OpenAuth behavior", async () => {
    const response = await app.request(
      "https://auth.example.com/.well-known/jwks.json",
    )
    expect(response.status).toBe(200)
    const body = await response.json()
    // OpenAuth's own signing keys, not an (empty) agent JWKS
    expect(body.keys.length).toBeGreaterThan(0)
    expect(body.keys[0].alg).toBe("ES256")
  })
})

describe("registration", () => {
  test("happy path: register, appear in JWKS, mint + verify offline", async () => {
    const token = await accessToken()
    const key = await newAgentKey("RS256")
    const registered = await registerOk(`tenant1.${DOMAIN}`, token, key)
    expect(registered.kid).toBe(key.thumbprint)
    expect(registered.sub).toBe("defang:project:playground:stack:staging")
    expect(registered.issuer).toBe(TENANT1)

    const keys = await jwks(`tenant1.${DOMAIN}`)
    expect(keys.keys.map((k: any) => k.kid)).toContain(key.thumbprint)

    // agent mints a JWT locally; validate against the tenant JWKS
    const minted = await new SignJWT({})
      .setProtectedHeader({ alg: "RS256", kid: registered.kid })
      .setIssuer(TENANT1)
      .setSubject(registered.sub)
      .setAudience("sts.amazonaws.com")
      .setIssuedAt()
      .setExpirationTime("5m")
      .sign(key.privateKey)
    const verified = await jwtVerify(minted, createLocalJWKSet(keys), {
      issuer: TENANT1,
      audience: "sts.amazonaws.com",
    })
    expect(verified.payload.sub).toBe(registered.sub)
  })

  test("registration is idempotent for the same jwk and (project, stack)", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const first = await registerOk(`tenant1.${DOMAIN}`, token, key)
    const second = await registerOk(`tenant1.${DOMAIN}`, token, key)
    expect(second.kid).toBe(first.kid)
    const keys = await jwks(`tenant1.${DOMAIN}`)
    expect(keys.keys.length).toBe(1)
  })

  test("same jwk against a different (project, stack) is rejected with 409", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    await registerOk(`tenant1.${DOMAIN}`, token, key)
    const response = await register(`tenant1.${DOMAIN}`, token, {
      project_id: "playground",
      stack_id: "prod",
      jwk: key.jwk,
      pop_jwt: await popJwt(key),
    })
    expect(response.status).toBe(409)
  })

  test("jwk with private material is rejected", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const privateJwk = await exportJWK(key.privateKey)
    const response = await register(`tenant1.${DOMAIN}`, token, {
      project_id: "playground",
      stack_id: "staging",
      jwk: privateJwk,
      pop_jwt: await popJwt(key),
    })
    expect(response.status).toBe(400)
    expect((await response.json()).error_description).toContain("private")
  })

  test("registration requires a bearer token", async () => {
    const key = await newAgentKey()
    const response = await app.request(`https://tenant1.${DOMAIN}/keys`, {
      method: "POST",
      headers: tenantHost(`tenant1.${DOMAIN}`, {
        "content-type": "application/json",
      }),
      body: JSON.stringify({
        project_id: "playground",
        stack_id: "staging",
        jwk: key.jwk,
        pop_jwt: await popJwt(key),
      }),
    })
    expect(response.status).toBe(401)

    const garbage = await register(`tenant1.${DOMAIN}`, "garbage", {
      project_id: "playground",
      stack_id: "staging",
      jwk: key.jwk,
      pop_jwt: await popJwt(key),
    })
    expect(garbage.status).toBe(401)
  })
})

describe("proof of possession", () => {
  test("missing pop_jwt is rejected", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const response = await register(`tenant1.${DOMAIN}`, token, {
      project_id: "playground",
      stack_id: "staging",
      jwk: key.jwk,
    })
    expect(response.status).toBe(400)
  })

  test("pop_jwt signed by a different private key is rejected", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const other = await newAgentKey()
    const response = await register(`tenant1.${DOMAIN}`, token, {
      project_id: "playground",
      stack_id: "staging",
      jwk: key.jwk,
      pop_jwt: await popJwt(key, { signWith: other.privateKey as CryptoKey }),
    })
    expect(response.status).toBe(400)
  })

  test("stale pop_jwt iat is rejected", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const response = await register(`tenant1.${DOMAIN}`, token, {
      project_id: "playground",
      stack_id: "staging",
      jwk: key.jwk,
      pop_jwt: await popJwt(key, {
        iat: Math.floor(Date.now() / 1000) - 600,
      }),
    })
    expect(response.status).toBe(400)
  })

  test("pop_jwt with a mismatched thumbprint is rejected", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const response = await register(`tenant1.${DOMAIN}`, token, {
      project_id: "playground",
      stack_id: "staging",
      jwk: key.jwk,
      pop_jwt: await popJwt(key, { thumb: "someone-elses-thumbprint" }),
    })
    expect(response.status).toBe(400)
  })
})

describe("tenant isolation", () => {
  test("keys registered under tenant1 do not appear in tenant2's JWKS", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    await registerOk(`tenant1.${DOMAIN}`, token, key)
    const keys1 = await jwks(`tenant1.${DOMAIN}`)
    const keys2 = await jwks(`tenant2.${DOMAIN}`)
    expect(keys1.keys.length).toBe(1)
    expect(keys2.keys.length).toBe(0)
  })

  test("issuer and storage scope follow the resolved host, not the body", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    // body mentions tenant1 everywhere; host resolves tenant2
    const response = await register(`tenant2.${DOMAIN}`, token, {
      project_id: "tenant1",
      stack_id: "tenant1",
      jwk: key.jwk,
      pop_jwt: await popJwt(key),
    })
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.issuer).toBe(TENANT2)
    expect((await jwks(`tenant2.${DOMAIN}`)).keys.length).toBe(1)
    expect((await jwks(`tenant1.${DOMAIN}`)).keys.length).toBe(0)
  })
})

describe("lifecycle", () => {
  test("list and revoke", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const registered = await registerOk(`tenant1.${DOMAIN}`, token, key)

    const listResponse = await app.request(`https://tenant1.${DOMAIN}/keys`, {
      headers: tenantHost(`tenant1.${DOMAIN}`, {
        authorization: `Bearer ${token}`,
      }),
    })
    expect(listResponse.status).toBe(200)
    const listed = await listResponse.json()
    expect(listed.keys.length).toBe(1)
    expect(listed.keys[0].kid).toBe(registered.kid)

    const deleteResponse = await app.request(
      `https://tenant1.${DOMAIN}/keys/${registered.kid}`,
      {
        method: "DELETE",
        headers: tenantHost(`tenant1.${DOMAIN}`, {
          authorization: `Bearer ${token}`,
        }),
      },
    )
    expect(deleteResponse.status).toBe(204)
    expect((await jwks(`tenant1.${DOMAIN}`)).keys.length).toBe(0)
  })

  test("revoking an unknown kid returns 404", async () => {
    const token = await accessToken()
    const response = await app.request(
      `https://tenant1.${DOMAIN}/keys/nonexistent`,
      {
        method: "DELETE",
        headers: tenantHost(`tenant1.${DOMAIN}`, {
          authorization: `Bearer ${token}`,
        }),
      },
    )
    expect(response.status).toBe(404)
  })

  test("expired keys are filtered from the JWKS", async () => {
    const token = await accessToken()
    const key = await newAgentKey()
    const registered = await registerOk(`tenant1.${DOMAIN}`, token, key, {
      ttl_seconds: 1,
    })
    expect(registered.exp).toBeGreaterThan(Date.now() / 1000)
    expect((await jwks(`tenant1.${DOMAIN}`)).keys.length).toBe(1)
    await new Promise((resolve) => setTimeout(resolve, 1100))
    expect((await jwks(`tenant1.${DOMAIN}`)).keys.length).toBe(0)
  })
})
