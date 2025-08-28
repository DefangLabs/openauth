/**
 * `/userinfo` endpoint returns the authenticated user's full profile.
 *
 * Claims from the JWT are validated and then merged with data from Hasura.
 * When `externalTenants` are present in the token we look up the
 * corresponding tenant records so callers always receive the full tenant
 * objects regardless of how the user obtained access.
 */
import { Hono } from "hono";
import { hasuraAdminClient } from "../hasura/hasura";
import { authorizeRequest } from "../lib/authorize-request";
import { ExternalTenantsQuery } from "./external-tenants-query";
import { UserinfoQuery } from "./userinfo-query";

export const userinfoRouter = new Hono();

/**
 * This route returns all the user's data based on the token in the Authorization header.
 */
userinfoRouter.get("/", async (c) => {
  const { claims, error } = await authorizeRequest(c);
  if (error || !claims) {
    return c.json({ error }, 403);
  }

  const id = claims.sub;

  if (!id) {
    return c.json({ error: "No user id found in claims" }, 403);
  }

  const { data: userInfo, errors: queryErrors } = (await hasuraAdminClient(
    UserinfoQuery,
    { id }
  ));

    const externalIds = Array.isArray(claims.externalTenants) ? claims.externalTenants : []
    let externalTenants: { id: string; name: string }[] = []

    if (externalIds.length) {
        const { data } = await hasuraAdminClient(ExternalTenantsQuery, { ids: externalIds })
        externalTenants = data?.tenants ?? []
    }

    if (queryErrors) {
        throw new Error(queryErrors?.[0]?.message);
    }

    const allAccessibleTenants = [
        ...(userInfo?.userinfo?.ownedTenants ?? []),
        ...(userInfo?.userinfo?.tenantMemberships.map((m) => m.tenant) ?? []),
        ...externalTenants,
    ];

    const uniqueTenants = new Map<string, { id: string; name: string }>();
    allAccessibleTenants.forEach(tenant => {
        if (!uniqueTenants.has(tenant.id)) {
            uniqueTenants.set(tenant.id, { id: tenant.id, name: tenant.name });
        }
    });
    const allTenants = Array.from(uniqueTenants.values());

    return c.json({
        ...userInfo,
        allTenants,
    });
});
