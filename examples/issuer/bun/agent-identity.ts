/**
 * Agent-identity spike issuer. See `docs/agent-identity.md`.
 *
 * Serves the normal OpenAuth flow on the apex host, and agent identity on
 * `tenant1.<domain>` / `tenant2.<domain>`. Registration tokens come from the
 * `client_credentials` grant on the apex `/token` endpoint:
 *
 * ```
 * curl -X POST https://<apex>/token \
 *   -d grant_type=client_credentials -d provider=spike \
 *   -d client_id=lio -d client_secret=$SPIKE_CLIENT_SECRET
 * ```
 *
 * Env: PORT (4000), TENANT_DOMAIN (auth-spike.nixos.defang.ca),
 * SPIKE_CLIENT_SECRET (required), PERSIST (./persist.json).
 */
// source imports so the spike runs without building dist
import { issuer } from "../../../packages/openauth/src/issuer.js"
import { MemoryStorage } from "../../../packages/openauth/src/storage/memory.js"
import { Provider } from "../../../packages/openauth/src/provider/provider.js"
import { subjects } from "../../subjects.js"

const secret = process.env.SPIKE_CLIENT_SECRET
if (!secret) throw new Error("SPIKE_CLIENT_SECRET is required")

const domain = process.env.TENANT_DOMAIN ?? "auth-spike.nixos.defang.ca"

const app = issuer({
  subjects,
  storage: MemoryStorage({
    persist: process.env.PERSIST ?? "./persist.json",
  }),
  tenants: {
    domain,
    tenants: {
      tenant1: {},
      tenant2: {},
    },
  },
  providers: {
    spike: {
      type: "spike",
      init() {},
      client: async ({ clientID, clientSecret }) => {
        if (clientSecret !== secret) throw new Error("Wrong credentials")
        return { userID: clientID }
      },
    } satisfies Provider<{ userID: string }>,
  },
  ttl: {
    // registration tokens don't need to live a month
    access: 60 * 60,
  },
  allow: async () => true,
  success: async (ctx, value) => {
    if (value.provider === "spike") {
      return ctx.subject("user", { id: value.userID })
    }
    throw new Error("Invalid provider")
  },
})

export default {
  port: Number(process.env.PORT ?? 4000),
  fetch: app.fetch,
}
