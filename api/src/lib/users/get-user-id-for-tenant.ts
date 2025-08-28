import { graphql } from "../../graphql";
import { getHasuraClient } from "../hasura/client";

/**
 * For reference, the tenants relationship to users is
 * one where the tenant has the ownerId set to the user id.
 * 
 * For non-owner relationships, the relationship is through
 * the tenantMembers field.
 */
const userIdForTenantQuery = graphql(`
 query UserIdForTenant($tenantId: uuid!) {
  users(
    where: {
      tenants: {
        id: {
          _eq: $tenantId
        }
      }
    }
  ) {
    id
  }
}
`)

export function getUserIdForTenant(tenantId: string) {
    const client = getHasuraClient();
    return client.fetch(userIdForTenantQuery, { tenantId });
}
