import { graphql } from "@/generated/graphql";

export const CustomPricingTableQuery = graphql(`
  query CustomPricingTableQuery($tenantId: uuid!) {
    tenant: tenantsByPk(id: $tenantId) {
      awsMarketplaceAccountId
    }
  }
`);
