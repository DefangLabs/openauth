import { useQuery } from "@apollo/client";
import { CustomPricingTableQuery } from "../graphql/queries/custom-pricing-table-query";
import { useCurrentTenantId } from "@/modules/tenants/hooks/use-current-tenant-id";

export function useCustomPricingTableQuery() {
  const { currentTenantId } = useCurrentTenantId();
  return useQuery(CustomPricingTableQuery, {
    variables: { tenantId: currentTenantId },
    skip: !currentTenantId,
  });
}
