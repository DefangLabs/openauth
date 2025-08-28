/**
 * Fetches the members of a specific tenant along with basic profile info.
 * The query expects a tenant UUID and returns each member's role.
 */
import { graphql } from "@/generated/graphql";

export const tenantMembersQuery = graphql(`
  query TenantMembers($tenantId: uuid!) {
    tenantMembers(where: { tenantId: { _eq: $tenantId } }) {
      role
      user {
        id
        name
        email
      }
    }
  }
`);
