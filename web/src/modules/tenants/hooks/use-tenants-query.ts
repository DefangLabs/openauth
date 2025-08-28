import { useQuery } from "@apollo/client";
import { tenantsQuery } from "../graphql/queries/tenants-query";

export function useTenantsQuery() {
  return useQuery(tenantsQuery);
}
