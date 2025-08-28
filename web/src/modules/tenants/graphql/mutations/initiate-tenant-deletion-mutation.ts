import { graphql } from "@/generated/graphql";

export const initiateTenantDeletionMutation = graphql(`
  mutation InitiateTenantDeletion($tenantId: uuid!) {
    initiateTenantDeletion(tenantId: $tenantId) {
      message
    }
  }
`);
