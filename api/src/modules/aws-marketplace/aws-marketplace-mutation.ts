import { graphql } from "../../graphql";

export const UpdateTenantAwsMarketplace = graphql(`
  mutation UpdateTenantAwsMarketplace(
    $tenantId: uuid!
    $customerIdentifier: String!
    $accountId: String!
    $productCode: String!
  ) {
    updateTenants(
      where: {
        id: { _eq: $tenantId }
        _or: [
          {
            awsMarketplaceCustomerIdentifier: { _isNull: true }
            awsMarketplaceAccountId: { _isNull: true }
            awsMarketplaceProductCode: { _isNull: true }
          }
          {
            awsMarketplaceCustomerIdentifier: { _eq: $customerIdentifier }
            awsMarketplaceAccountId: { _eq: $accountId }
            awsMarketplaceProductCode: { _eq: $productCode }
          }
        ]
      }
      _set: {
        awsMarketplaceCustomerIdentifier: $customerIdentifier
        awsMarketplaceAccountId: $accountId
        awsMarketplaceProductCode: $productCode
      }
    ) {
      affectedRows
    }
  }
`);
