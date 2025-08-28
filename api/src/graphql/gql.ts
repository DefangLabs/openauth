/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n query UserIdForTenant($tenantId: uuid!) {\n  users(\n    where: {\n      tenants: {\n        id: {\n          _eq: $tenantId\n        }\n      }\n    }\n  ) {\n    id\n  }\n}\n": types.UserIdForTenantDocument,
    "\n  mutation UpdateTenantAwsMarketplace(\n    $tenantId: uuid!\n    $customerIdentifier: String!\n    $accountId: String!\n    $productCode: String!\n  ) {\n    updateTenants(\n      where: {\n        id: { _eq: $tenantId }\n        _or: [\n          {\n            awsMarketplaceCustomerIdentifier: { _isNull: true }\n            awsMarketplaceAccountId: { _isNull: true }\n            awsMarketplaceProductCode: { _isNull: true }\n          }\n          {\n            awsMarketplaceCustomerIdentifier: { _eq: $customerIdentifier }\n            awsMarketplaceAccountId: { _eq: $accountId }\n            awsMarketplaceProductCode: { _eq: $productCode }\n          }\n        ]\n      }\n      _set: {\n        awsMarketplaceCustomerIdentifier: $customerIdentifier\n        awsMarketplaceAccountId: $accountId\n        awsMarketplaceProductCode: $productCode\n      }\n    ) {\n      affectedRows\n    }\n  }\n": types.UpdateTenantAwsMarketplaceDocument,
    "\n  query TenantOwnerEmail($tenantId: uuid!) {\n    tenants(where: { id: { _eq: $tenantId } }) {\n      id\n      owner {\n        email\n      }\n    }\n  }\n": types.TenantOwnerEmailDocument,
    "\n  query TenantOwnership($tenantId: uuid!, $ownerId: uuid!) {\n    tenants(where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }) {\n      id\n    }\n  }\n": types.TenantOwnershipDocument,
    "\n  mutation DeleteTenant($tenantId: uuid!, $ownerId: uuid!) {\n    deleteTenants(where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }) {\n      affectedRows\n    }\n  }\n": types.DeleteTenantDocument,
    "\n    mutation DeleteUser($id: uuid!) {\n        deleteUsersByPk(id: $id) {\n            id\n        }\n    }\n": types.DeleteUserDocument,
    "\n    query OwnedTenants($ownerId: uuid!) {\n        tenants(where: { ownerId: { _eq: $ownerId } }) {\n            id\n        }\n    }\n": types.OwnedTenantsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query UserIdForTenant($tenantId: uuid!) {\n  users(\n    where: {\n      tenants: {\n        id: {\n          _eq: $tenantId\n        }\n      }\n    }\n  ) {\n    id\n  }\n}\n"): typeof import('./graphql').UserIdForTenantDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTenantAwsMarketplace(\n    $tenantId: uuid!\n    $customerIdentifier: String!\n    $accountId: String!\n    $productCode: String!\n  ) {\n    updateTenants(\n      where: {\n        id: { _eq: $tenantId }\n        _or: [\n          {\n            awsMarketplaceCustomerIdentifier: { _isNull: true }\n            awsMarketplaceAccountId: { _isNull: true }\n            awsMarketplaceProductCode: { _isNull: true }\n          }\n          {\n            awsMarketplaceCustomerIdentifier: { _eq: $customerIdentifier }\n            awsMarketplaceAccountId: { _eq: $accountId }\n            awsMarketplaceProductCode: { _eq: $productCode }\n          }\n        ]\n      }\n      _set: {\n        awsMarketplaceCustomerIdentifier: $customerIdentifier\n        awsMarketplaceAccountId: $accountId\n        awsMarketplaceProductCode: $productCode\n      }\n    ) {\n      affectedRows\n    }\n  }\n"): typeof import('./graphql').UpdateTenantAwsMarketplaceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TenantOwnerEmail($tenantId: uuid!) {\n    tenants(where: { id: { _eq: $tenantId } }) {\n      id\n      owner {\n        email\n      }\n    }\n  }\n"): typeof import('./graphql').TenantOwnerEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TenantOwnership($tenantId: uuid!, $ownerId: uuid!) {\n    tenants(where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }) {\n      id\n    }\n  }\n"): typeof import('./graphql').TenantOwnershipDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTenant($tenantId: uuid!, $ownerId: uuid!) {\n    deleteTenants(where: { id: { _eq: $tenantId }, ownerId: { _eq: $ownerId } }) {\n      affectedRows\n    }\n  }\n"): typeof import('./graphql').DeleteTenantDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteUser($id: uuid!) {\n        deleteUsersByPk(id: $id) {\n            id\n        }\n    }\n"): typeof import('./graphql').DeleteUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query OwnedTenants($ownerId: uuid!) {\n        tenants(where: { ownerId: { _eq: $ownerId } }) {\n            id\n        }\n    }\n"): typeof import('./graphql').OwnedTenantsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
