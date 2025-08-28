/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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
  "\n  query CustomPricingTableQuery($tenantId: uuid!) {\n    tenant: tenantsByPk(id: $tenantId) {\n      awsMarketplaceAccountId\n    }\n  }\n":
    types.CustomPricingTableQueryDocument,
  "\n  mutation DeleteUserMutation {\n    deleteUser {\n      message\n    }\n  }\n":
    types.DeleteUserMutationDocument,
  "\n  mutation ResolveAwsMarketplaceCustomer(\n    $input: ResolveAwsMarketplaceCustomerInput!\n  ) {\n    resolveAwsMarketplaceCustomer(input: $input) {\n      customerAWSAccountId\n      customerIdentifier\n      productCode\n    }\n  }\n":
    types.ResolveAwsMarketplaceCustomerDocument,
  "\n  mutation InsertUserMutation($object: UsersInsertInput!) {\n    user: insertUsersOne(\n      object: $object\n      onConflict: { constraint: profiles_pkey, updateColumns: [name] }\n    ) {\n      id\n      name\n    }\n  }\n":
    types.InsertUserMutationDocument,
  "\n  query UserQuery($id: uuid!) {\n    user: usersByPk(id: $id) {\n      id\n      name\n      email\n    }\n  }\n":
    types.UserQueryDocument,
  "\n  mutation CreateStripeCheckoutSession($priceId: String!) {\n    createStripeCheckoutSession(input: { priceId: $priceId }) {\n      url\n    }\n  }\n":
    types.CreateStripeCheckoutSessionDocument,
  "\n  mutation CreateStripePortalSession {\n    createStripePortalSession {\n      url\n    }\n  }\n":
    types.CreateStripePortalSessionDocument,
  "\n  mutation CreateStripeSecret {\n    createStripeSecret {\n      secret\n    }\n  }\n":
    types.CreateStripeSecretDocument,
  "\n  mutation CreateTenant($name: String!) {\n    tenant: insertTenantsOne(object: { name: $name }) {\n      id\n      name\n    }\n  }\n":
    types.CreateTenantDocument,
  "\n  mutation InitiateTenantDeletion($tenantId: uuid!) {\n    initiateTenantDeletion(tenantId: $tenantId) {\n      message\n    }\n  }\n":
    types.InitiateTenantDeletionDocument,
  '\n  mutation InviteTenantMember(\n    $tenantId: uuid!\n    $userId: uuid!\n    $role: String = "member"\n  ) {\n    member: insertTenantMembersOne(\n      object: { tenantId: $tenantId, userId: $userId, role: $role }\n    ) {\n      tenantId\n      userId\n    }\n  }\n':
    types.InviteTenantMemberDocument,
  "\n  query TenantMembers($tenantId: uuid!) {\n    tenantMembers(where: { tenantId: { _eq: $tenantId } }) {\n      role\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n":
    types.TenantMembersDocument,
  "\n  query TenantsQuery {\n    tenants {\n      id\n      name\n    }\n  }\n":
    types.TenantsQueryDocument,
  "\n  query UserByEmail($email: String!) {\n    users(where: { email: { _eq: $email } }, limit: 1) {\n      id\n      email\n      name\n    }\n  }\n":
    types.UserByEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CustomPricingTableQuery($tenantId: uuid!) {\n    tenant: tenantsByPk(id: $tenantId) {\n      awsMarketplaceAccountId\n    }\n  }\n",
): (typeof documents)["\n  query CustomPricingTableQuery($tenantId: uuid!) {\n    tenant: tenantsByPk(id: $tenantId) {\n      awsMarketplaceAccountId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteUserMutation {\n    deleteUser {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation DeleteUserMutation {\n    deleteUser {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ResolveAwsMarketplaceCustomer(\n    $input: ResolveAwsMarketplaceCustomerInput!\n  ) {\n    resolveAwsMarketplaceCustomer(input: $input) {\n      customerAWSAccountId\n      customerIdentifier\n      productCode\n    }\n  }\n",
): (typeof documents)["\n  mutation ResolveAwsMarketplaceCustomer(\n    $input: ResolveAwsMarketplaceCustomerInput!\n  ) {\n    resolveAwsMarketplaceCustomer(input: $input) {\n      customerAWSAccountId\n      customerIdentifier\n      productCode\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation InsertUserMutation($object: UsersInsertInput!) {\n    user: insertUsersOne(\n      object: $object\n      onConflict: { constraint: profiles_pkey, updateColumns: [name] }\n    ) {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  mutation InsertUserMutation($object: UsersInsertInput!) {\n    user: insertUsersOne(\n      object: $object\n      onConflict: { constraint: profiles_pkey, updateColumns: [name] }\n    ) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query UserQuery($id: uuid!) {\n    user: usersByPk(id: $id) {\n      id\n      name\n      email\n    }\n  }\n",
): (typeof documents)["\n  query UserQuery($id: uuid!) {\n    user: usersByPk(id: $id) {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateStripeCheckoutSession($priceId: String!) {\n    createStripeCheckoutSession(input: { priceId: $priceId }) {\n      url\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateStripeCheckoutSession($priceId: String!) {\n    createStripeCheckoutSession(input: { priceId: $priceId }) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateStripePortalSession {\n    createStripePortalSession {\n      url\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateStripePortalSession {\n    createStripePortalSession {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateStripeSecret {\n    createStripeSecret {\n      secret\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateStripeSecret {\n    createStripeSecret {\n      secret\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateTenant($name: String!) {\n    tenant: insertTenantsOne(object: { name: $name }) {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateTenant($name: String!) {\n    tenant: insertTenantsOne(object: { name: $name }) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation InitiateTenantDeletion($tenantId: uuid!) {\n    initiateTenantDeletion(tenantId: $tenantId) {\n      message\n    }\n  }\n",
): (typeof documents)["\n  mutation InitiateTenantDeletion($tenantId: uuid!) {\n    initiateTenantDeletion(tenantId: $tenantId) {\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation InviteTenantMember(\n    $tenantId: uuid!\n    $userId: uuid!\n    $role: String = "member"\n  ) {\n    member: insertTenantMembersOne(\n      object: { tenantId: $tenantId, userId: $userId, role: $role }\n    ) {\n      tenantId\n      userId\n    }\n  }\n',
): (typeof documents)['\n  mutation InviteTenantMember(\n    $tenantId: uuid!\n    $userId: uuid!\n    $role: String = "member"\n  ) {\n    member: insertTenantMembersOne(\n      object: { tenantId: $tenantId, userId: $userId, role: $role }\n    ) {\n      tenantId\n      userId\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query TenantMembers($tenantId: uuid!) {\n    tenantMembers(where: { tenantId: { _eq: $tenantId } }) {\n      role\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n",
): (typeof documents)["\n  query TenantMembers($tenantId: uuid!) {\n    tenantMembers(where: { tenantId: { _eq: $tenantId } }) {\n      role\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query TenantsQuery {\n    tenants {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  query TenantsQuery {\n    tenants {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query UserByEmail($email: String!) {\n    users(where: { email: { _eq: $email } }, limit: 1) {\n      id\n      email\n      name\n    }\n  }\n",
): (typeof documents)["\n  query UserByEmail($email: String!) {\n    users(where: { email: { _eq: $email } }, limit: 1) {\n      id\n      email\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
