/**
 * Spike agent CLI. See `docs/agent-identity.md`.
 *
 * The agent-side half of the flow: generate a keypair (private key stays
 * here), register the public half with the tenant issuer, mint self-signed
 * JWTs, and exchange them at AWS STS for short-lived credentials.
 *
 * ```
 * bun agent.ts keygen  --dir .agent
 * bun agent.ts token    --apex https://auth-spike.nixos.defang.ca --client-id lio --secret $SPIKE_CLIENT_SECRET
 * bun agent.ts register --tenant https://tenant1.auth-spike.nixos.defang.ca \
 *                       --project playground --stack staging --token $ACCESS_TOKEN --dir .agent
 * bun agent.ts mint     --tenant https://tenant1.auth-spike.nixos.defang.ca \
 *                       --project playground --stack staging --aud sts.amazonaws.com --dir .agent
 * bun agent.ts exchange-aws --role-arn arn:aws:iam::123456789012:role/agent-spike --jwt $JWT
 * ```
 */
import { parseArgs } from "node:util"
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import {
  calculateJwkThumbprint,
  exportJWK,
  exportPKCS8,
  generateKeyPair,
  importPKCS8,
  SignJWT,
  JWK,
} from "jose"

const ALG = "RS256"

const [command, ...rest] = process.argv.slice(2)
const { values: args } = parseArgs({
  args: rest,
  options: {
    dir: { type: "string", default: ".agent" },
    apex: { type: "string" },
    tenant: { type: "string" },
    project: { type: "string" },
    stack: { type: "string" },
    token: { type: "string" },
    ttl: { type: "string" },
    aud: { type: "string", default: "sts.amazonaws.com" },
    exp: { type: "string", default: "300" },
    "client-id": { type: "string" },
    secret: { type: "string" },
    jwt: { type: "string" },
    "role-arn": { type: "string" },
    "session-name": { type: "string", default: "defang-agent" },
  },
})

function need<T>(value: T | undefined, flag: string): T {
  if (value === undefined) {
    console.error(`missing --${flag}`)
    process.exit(1)
  }
  return value
}

async function loadKey(dir: string) {
  const jwk = JSON.parse(
    readFileSync(join(dir, "public.jwk.json"), "utf8"),
  ) as JWK
  const privateKey = await importPKCS8(
    readFileSync(join(dir, "private.pem"), "utf8"),
    ALG,
  )
  return { jwk, privateKey, thumbprint: await calculateJwkThumbprint(jwk) }
}

async function fail(response: Response): Promise<never> {
  console.error(`${response.status} ${await response.text()}`)
  process.exit(1)
}

switch (command) {
  case "keygen": {
    const dir = args.dir!
    if (existsSync(join(dir, "private.pem"))) {
      console.error(`${dir}/private.pem already exists, not overwriting`)
      process.exit(1)
    }
    const pair = await generateKeyPair(ALG, { extractable: true })
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, "private.pem"), await exportPKCS8(pair.privateKey))
    const jwk = await exportJWK(pair.publicKey)
    writeFileSync(join(dir, "public.jwk.json"), JSON.stringify(jwk, null, 2))
    console.error(`wrote ${dir}/private.pem and ${dir}/public.jwk.json`)
    console.log(await calculateJwkThumbprint(jwk))
    break
  }

  case "token": {
    const response = await fetch(`${need(args.apex, "apex")}/token`, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
        provider: "spike",
        client_id: need(args["client-id"], "client-id"),
        client_secret: need(args.secret, "secret"),
      }),
    })
    if (!response.ok) await fail(response)
    console.log((await response.json()).access_token)
    break
  }

  case "register": {
    const key = await loadKey(args.dir!)
    const popJwt = await new SignJWT({ jwk_thumb: key.thumbprint })
      .setIssuedAt()
      .setProtectedHeader({ alg: ALG })
      .sign(key.privateKey)
    const response = await fetch(`${need(args.tenant, "tenant")}/keys`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${need(args.token, "token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        project_id: need(args.project, "project"),
        stack_id: need(args.stack, "stack"),
        jwk: key.jwk,
        pop_jwt: popJwt,
        ...(args.ttl ? { ttl_seconds: Number(args.ttl) } : {}),
      }),
    })
    if (!response.ok) await fail(response)
    console.log(JSON.stringify(await response.json(), null, 2))
    break
  }

  case "mint": {
    const key = await loadKey(args.dir!)
    const sub = `defang:project:${need(args.project, "project")}:stack:${need(args.stack, "stack")}`
    const jwt = await new SignJWT({})
      .setProtectedHeader({ alg: ALG, kid: key.thumbprint })
      .setIssuer(need(args.tenant, "tenant"))
      .setSubject(sub)
      .setAudience(args.aud!)
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + Number(args.exp))
      .setJti(crypto.randomUUID())
      .sign(key.privateKey)
    console.log(jwt)
    break
  }

  case "exchange-aws": {
    const jwt = args.jwt ?? (await new Response(process.stdin as any).text()).trim()
    const query = new URLSearchParams({
      Action: "AssumeRoleWithWebIdentity",
      Version: "2011-06-15",
      RoleArn: need(args["role-arn"], "role-arn"),
      RoleSessionName: args["session-name"]!,
      WebIdentityToken: jwt,
    })
    const response = await fetch(`https://sts.amazonaws.com/?${query}`, {
      headers: { accept: "application/json" },
    })
    if (!response.ok) await fail(response)
    const credentials = (await response.json())
      .AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult
      .Credentials
    console.error(`expires ${new Date(credentials.Expiration * 1000).toISOString()}`)
    console.log(`export AWS_ACCESS_KEY_ID=${credentials.AccessKeyId}`)
    console.log(`export AWS_SECRET_ACCESS_KEY=${credentials.SecretAccessKey}`)
    console.log(`export AWS_SESSION_TOKEN=${credentials.SessionToken}`)
    break
  }

  default:
    console.error(
      "usage: agent.ts keygen|token|register|mint|exchange-aws [flags]",
    )
    process.exit(1)
}
