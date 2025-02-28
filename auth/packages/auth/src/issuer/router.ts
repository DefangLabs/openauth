import { issuer } from "@openauthjs/openauth"
import * as v from 'valibot'
import { upsertAccount } from "../accounts/upsert-account"
import { analytics } from "../analytics/analytics"
import { getAllowedOrigins } from "../lib/get-allowed-origins"
import { getCodeData } from "../providers/code"
import { getGithubData } from "../providers/github"
import { ProviderData, providerDataSchema } from "../providers/provider-data-schema"
import { providers } from "../providers/providers"
import { subjects } from "../subjects"
import { upsertAccountUser } from "../users/upsert-account-user"
import { storage } from "./storage"
import "../analytics/analytics"

export const issuerRouter = issuer({
  subjects,
  storage,
  providers,
  theme: {
    primary: '#4491fd',
    logo: 'https://defang.io/_next/static/media/DEFANG-1_4x-no-text-256.a3fe9447.svg',
    css: 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap',
    font: {
      family: '"Exo 2", sans-serif',
    },
    title: 'Defang',
    favicon: 'https://defang.io/_next/static/media/DEFANG-1_4x-no-text-256.a3fe9447.svg',
    radius: 'lg',
  },
  ttl: {
    access: 60 * 60 * 24, // Default to 24 hours
    refresh: 60 * 60 * 24 * 30, // Default to 30 days
  },
  success: async (ctx, value, req) => {
    let providerData: ProviderData | undefined;
    let clientID: string | undefined;

    if (value.provider === 'code') {
      providerData = getCodeData(value.claims.email)
      clientID = value.claims.client_id
    }
    else if (value.provider === 'github') {
      providerData = await getGithubData(value.tokenset.access)
      clientID = value.clientID
    }


    const validProviderData = v.parse(providerDataSchema, providerData)

    const { account } = await upsertAccount(validProviderData, value.provider)

    const { user, tenant } = await upsertAccountUser(account);

    analytics.track({
      userId: user.id,
      event: 'auth: login authorized',
      properties: {
        provider: value.provider,
      }
    })

    return ctx.subject(
      "user",
      {
        id: user.id,
        tenant: tenant ?? "",
        hasura: {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": user.id,
        }
      },
      {
        subject: user.id,
      }
    )
  },
  allow: async function allow(input, req) {
    // check redirect uri, client id, etc. to make sure it's a valid request from authorized sources
    // for now we'll just check that the origin of the redirect is in an authorized list
    const origin = new URL(input.redirectURI).origin
    const validOrigins = getAllowedOrigins()

    // check that the origin is in the list of valid origins
    const isValidOrigin = validOrigins.includes(origin)

    if (isValidOrigin) {
      return true
    }

    // Default to false if no valid origins found. Later we can add more checks in between.
    return false
  },
})
