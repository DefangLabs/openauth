/**
 * Convenience hook to query the members of a tenant.
 *
 * Returns the usual Apollo result object and should be used within client
 * components.
 */
import { useQuery } from "@apollo/client";
import { tenantMembersQuery } from "../graphql/queries/tenant-members-query";

export function useTenantMembersQuery(tenantId: string) {
  return useQuery(tenantMembersQuery, { variables: { tenantId } });
}
