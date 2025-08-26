import { graphql } from "@/generated/graphql";

export const ResolveAwsMarketplaceCustomerMutation = graphql(`
  mutation ResolveAwsMarketplaceCustomer(
    $input: ResolveAwsMarketplaceCustomerInput!
  ) {
    resolveAwsMarketplaceCustomer(input: $input) {
      customerAWSAccountId
      customerIdentifier
      productCode
    }
  }
`);
