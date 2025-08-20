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
    "\n    mutation UpsertAccount($object: AccountsInsertInput!, $onConflict: AccountsOnConflict) {\n        account: insertAccountsOne(object: $object, onConflict: $onConflict) {\n            id\n            name\n            email\n            extra\n        }\n    }\n": types.UpsertAccountDocument,
    "\n  query ListTenants($ownerId: uuid!) {\n     tenants(where: { ownerId: { _eq: $ownerId } }, orderBy: { createdAt: ASC }) {\n       id\n       name\n     }\n  }\n": types.ListTenantsDocument,
    "\n  mutation CreateDefaultTenant($name: String!, $ownerId: uuid!) {\n     tenant: insertTenantsOne(object: { id: $ownerId, name: $name, ownerId: $ownerId }) {\n       id\n       name\n     }\n   }\n": types.CreateDefaultTenantDocument,
    "\n    query UserInfo($id: uuid!) {\n        userinfo: usersByPk(\n            id: $id\n        ) {\n            id\n            email\n            name\n            createdAt\n            updatedAt\n            accounts: usersUserAccounts {\n                account: userAccountsAccount {\n                    id\n                    provider\n                    providerId\n                    name\n                    email\n                    createdAt\n                    updatedAt\n                }\n            }\n        }\n    }\n": types.UserInfoDocument,
    "\n    query UsersForAccount($accountId: uuid!) {\n        users(\n            where: { \n                usersUserAccounts: {\n                    accountId: { _eq: $accountId }\n                }\n             }\n        ) {\n            id\n        }\n    }    \n": types.UsersForAccountDocument,
    "\n    mutation UpsertAccountUser($object: UsersInsertInput!, $onConflict: UsersOnConflict!) {\n        user: insertUsersOne(object: $object, onConflict: $onConflict) {\n            id\n            name\n            email\n            usersUserAccounts {\n                userAccountsAccount {\n                    provider\n                    extra\n                }\n            }\n        }\n    }    \n": types.UpsertAccountUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpsertAccount($object: AccountsInsertInput!, $onConflict: AccountsOnConflict) {\n        account: insertAccountsOne(object: $object, onConflict: $onConflict) {\n            id\n            name\n            email\n            extra\n        }\n    }\n"): typeof import('./graphql').UpsertAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListTenants($ownerId: uuid!) {\n     tenants(where: { ownerId: { _eq: $ownerId } }, orderBy: { createdAt: ASC }) {\n       id\n       name\n     }\n  }\n"): typeof import('./graphql').ListTenantsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDefaultTenant($name: String!, $ownerId: uuid!) {\n     tenant: insertTenantsOne(object: { id: $ownerId, name: $name, ownerId: $ownerId }) {\n       id\n       name\n     }\n   }\n"): typeof import('./graphql').CreateDefaultTenantDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UserInfo($id: uuid!) {\n        userinfo: usersByPk(\n            id: $id\n        ) {\n            id\n            email\n            name\n            createdAt\n            updatedAt\n            accounts: usersUserAccounts {\n                account: userAccountsAccount {\n                    id\n                    provider\n                    providerId\n                    name\n                    email\n                    createdAt\n                    updatedAt\n                }\n            }\n        }\n    }\n"): typeof import('./graphql').UserInfoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query UsersForAccount($accountId: uuid!) {\n        users(\n            where: { \n                usersUserAccounts: {\n                    accountId: { _eq: $accountId }\n                }\n             }\n        ) {\n            id\n        }\n    }    \n"): typeof import('./graphql').UsersForAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpsertAccountUser($object: UsersInsertInput!, $onConflict: UsersOnConflict!) {\n        user: insertUsersOne(object: $object, onConflict: $onConflict) {\n            id\n            name\n            email\n            usersUserAccounts {\n                userAccountsAccount {\n                    provider\n                    extra\n                }\n            }\n        }\n    }    \n"): typeof import('./graphql').UpsertAccountUserDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
