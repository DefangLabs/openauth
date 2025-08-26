/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  timestamptz: { input: any; output: any };
  uuid: { input: any; output: any };
};

export type CreateStripeCheckoutSessionInput = {
  priceId: Scalars["String"]["input"];
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = "ASC",
  /** descending ordering of the cursor */
  Desc = "DESC",
}

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = "ASC",
  /** in ascending order, nulls first */
  AscNullsFirst = "ASC_NULLS_FIRST",
  /** in ascending order, nulls last */
  AscNullsLast = "ASC_NULLS_LAST",
  /** in descending order, nulls first */
  Desc = "DESC",
  /** in descending order, nulls first */
  DescNullsFirst = "DESC_NULLS_FIRST",
  /** in descending order, nulls last */
  DescNullsLast = "DESC_NULLS_LAST",
}

export type ResolveAwsMarketplaceCustomerInput = {
  registrationToken: Scalars["String"]["input"];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars["String"]["input"]>;
  _gt?: InputMaybe<Scalars["String"]["input"]>;
  _gte?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]["input"]>;
  _in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]["input"]>;
  _isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]["input"]>;
  _lt?: InputMaybe<Scalars["String"]["input"]>;
  _lte?: InputMaybe<Scalars["String"]["input"]>;
  _neq?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]["input"]>;
  _nin?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]["input"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]["input"]>;
};

/** order by aggregate values of table "tenantMembers" */
export type TenantMembersAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TenantMembersMaxOrderBy>;
  min?: InputMaybe<TenantMembersMinOrderBy>;
};

/** input type for inserting array relation for remote table "tenantMembers" */
export type TenantMembersArrRelInsertInput = {
  data: Array<TenantMembersInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<TenantMembersOnConflict>;
};

/** Boolean expression to filter rows from the table "tenantMembers". All fields are combined with a logical 'AND'. */
export type TenantMembersBoolExp = {
  _and?: InputMaybe<Array<TenantMembersBoolExp>>;
  _not?: InputMaybe<TenantMembersBoolExp>;
  _or?: InputMaybe<Array<TenantMembersBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  role?: InputMaybe<StringComparisonExp>;
  tenant?: InputMaybe<TenantsBoolExp>;
  tenantId?: InputMaybe<UuidComparisonExp>;
  tenantRole?: InputMaybe<TenantRolesBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "tenantMembers" */
export enum TenantMembersConstraint {
  /** unique or primary key constraint on columns "tenantId", "userId" */
  TenantMembersPkey = "tenantMembers_pkey",
}

/** input type for inserting data into table "tenantMembers" */
export type TenantMembersInsertInput = {
  role?: InputMaybe<Scalars["String"]["input"]>;
  tenant?: InputMaybe<TenantsObjRelInsertInput>;
  tenantId?: InputMaybe<Scalars["uuid"]["input"]>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars["uuid"]["input"]>;
};

/** order by max() on columns of table "tenantMembers" */
export type TenantMembersMaxOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  tenantId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "tenantMembers" */
export type TenantMembersMinOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  tenantId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** on_conflict condition type for table "tenantMembers" */
export type TenantMembersOnConflict = {
  constraint: TenantMembersConstraint;
  updateColumns?: Array<TenantMembersUpdateColumn>;
  where?: InputMaybe<TenantMembersBoolExp>;
};

/** Ordering options when selecting data from "tenantMembers". */
export type TenantMembersOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  tenant?: InputMaybe<TenantsOrderBy>;
  tenantId?: InputMaybe<OrderBy>;
  tenantRole?: InputMaybe<TenantRolesOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: tenantMembers */
export type TenantMembersPkColumnsInput = {
  tenantId: Scalars["uuid"]["input"];
  userId: Scalars["uuid"]["input"];
};

/** select columns of table "tenantMembers" */
export enum TenantMembersSelectColumn {
  /** column name */
  CreatedAt = "createdAt",
  /** column name */
  Role = "role",
  /** column name */
  TenantId = "tenantId",
  /** column name */
  UpdatedAt = "updatedAt",
  /** column name */
  UserId = "userId",
}

/** input type for updating data in table "tenantMembers" */
export type TenantMembersSetInput = {
  role?: InputMaybe<Scalars["String"]["input"]>;
};

/** Streaming cursor of the table "tenantMembers" */
export type TenantMembersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: TenantMembersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TenantMembersStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars["timestamptz"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  tenantId?: InputMaybe<Scalars["uuid"]["input"]>;
  updatedAt?: InputMaybe<Scalars["timestamptz"]["input"]>;
  userId?: InputMaybe<Scalars["uuid"]["input"]>;
};

/** update columns of table "tenantMembers" */
export enum TenantMembersUpdateColumn {
  /** column name */
  Role = "role",
}

export type TenantMembersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TenantMembersSetInput>;
  /** filter the rows which have to be updated */
  where: TenantMembersBoolExp;
};

/** Boolean expression to filter rows from the table "tenantRoles". All fields are combined with a logical 'AND'. */
export type TenantRolesBoolExp = {
  _and?: InputMaybe<Array<TenantRolesBoolExp>>;
  _not?: InputMaybe<TenantRolesBoolExp>;
  _or?: InputMaybe<Array<TenantRolesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  label?: InputMaybe<StringComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  tenantMembers?: InputMaybe<TenantMembersBoolExp>;
};

/** Ordering options when selecting data from "tenantRoles". */
export type TenantRolesOrderBy = {
  description?: InputMaybe<OrderBy>;
  label?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateOrderBy>;
};

/** select columns of table "tenantRoles" */
export enum TenantRolesSelectColumn {
  /** column name */
  Description = "description",
  /** column name */
  Label = "label",
  /** column name */
  Name = "name",
}

/** Streaming cursor of the table "tenantRoles" */
export type TenantRolesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: TenantRolesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TenantRolesStreamCursorValueInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** order by aggregate values of table "tenants" */
export type TenantsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TenantsMaxOrderBy>;
  min?: InputMaybe<TenantsMinOrderBy>;
};

/** input type for inserting array relation for remote table "tenants" */
export type TenantsArrRelInsertInput = {
  data: Array<TenantsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<TenantsOnConflict>;
};

/** Boolean expression to filter rows from the table "tenants". All fields are combined with a logical 'AND'. */
export type TenantsBoolExp = {
  _and?: InputMaybe<Array<TenantsBoolExp>>;
  _not?: InputMaybe<TenantsBoolExp>;
  _or?: InputMaybe<Array<TenantsBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  ownerId?: InputMaybe<UuidComparisonExp>;
  tenantMembers?: InputMaybe<TenantMembersBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
};

/** unique or primary key constraints on table "tenants" */
export enum TenantsConstraint {
  /** unique or primary key constraint on columns "awsMarketplaceCustomerIdentifier" */
  TenantsAwsMarketplaceCustomerIdentifierKey = "tenants_awsMarketplaceCustomerIdentifier_key",
  /** unique or primary key constraint on columns "id" */
  TenantsPkey = "tenants_pkey",
}

/** input type for inserting data into table "tenants" */
export type TenantsInsertInput = {
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  tenantMembers?: InputMaybe<TenantMembersArrRelInsertInput>;
  user?: InputMaybe<UsersObjRelInsertInput>;
};

/** order by max() on columns of table "tenants" */
export type TenantsMaxOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "tenants" */
export type TenantsMinOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** input type for inserting object relation for remote table "tenants" */
export type TenantsObjRelInsertInput = {
  data: TenantsInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<TenantsOnConflict>;
};

/** on_conflict condition type for table "tenants" */
export type TenantsOnConflict = {
  constraint: TenantsConstraint;
  updateColumns?: Array<TenantsUpdateColumn>;
  where?: InputMaybe<TenantsBoolExp>;
};

/** Ordering options when selecting data from "tenants". */
export type TenantsOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
};

/** select columns of table "tenants" */
export enum TenantsSelectColumn {
  /** column name */
  CreatedAt = "createdAt",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  OwnerId = "ownerId",
  /** column name */
  UpdatedAt = "updatedAt",
}

/** Streaming cursor of the table "tenants" */
export type TenantsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: TenantsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TenantsStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars["timestamptz"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  ownerId?: InputMaybe<Scalars["uuid"]["input"]>;
  updatedAt?: InputMaybe<Scalars["timestamptz"]["input"]>;
};

/** placeholder for update columns of table "tenants" (current role has no relevant permissions) */
export enum TenantsUpdateColumn {
  /** placeholder (do not use) */
  Placeholder = "_PLACEHOLDER",
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _gt?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _gte?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _in?: InputMaybe<Array<Scalars["timestamptz"]["input"]>>;
  _isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _lt?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _lte?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _neq?: InputMaybe<Scalars["timestamptz"]["input"]>;
  _nin?: InputMaybe<Array<Scalars["timestamptz"]["input"]>>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  tenantMembers?: InputMaybe<TenantMembersBoolExp>;
  tenants?: InputMaybe<TenantsBoolExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "id" */
  ProfilesPkey = "profiles_pkey",
}

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  tenantMembers?: InputMaybe<TenantMembersArrRelInsertInput>;
  tenants?: InputMaybe<TenantsArrRelInsertInput>;
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  updateColumns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateOrderBy>;
  tenantsAggregate?: InputMaybe<TenantsAggregateOrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars["uuid"]["input"];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** Streaming cursor of the table "users" */
export type UsersStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStreamCursorValueInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  Name = "name",
}

export type UsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars["uuid"]["input"]>;
  _gt?: InputMaybe<Scalars["uuid"]["input"]>;
  _gte?: InputMaybe<Scalars["uuid"]["input"]>;
  _in?: InputMaybe<Array<Scalars["uuid"]["input"]>>;
  _isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _lt?: InputMaybe<Scalars["uuid"]["input"]>;
  _lte?: InputMaybe<Scalars["uuid"]["input"]>;
  _neq?: InputMaybe<Scalars["uuid"]["input"]>;
  _nin?: InputMaybe<Array<Scalars["uuid"]["input"]>>;
};

export type DeleteAccountMutationMutationVariables = Exact<{
  [key: string]: never;
}>;

export type DeleteAccountMutationMutation = {
  __typename?: "mutation_root";
  deleteAccount?: {
    __typename?: "DeleteAccountOutput";
    message: string;
  } | null;
};

export type ResolveAwsMarketplaceCustomerMutationVariables = Exact<{
  input: ResolveAwsMarketplaceCustomerInput;
}>;

export type ResolveAwsMarketplaceCustomerMutation = {
  __typename?: "mutation_root";
  resolveAwsMarketplaceCustomer?: {
    __typename?: "ResolveAwsMarketplaceCustomerOutput";
    customerAWSAccountId: string;
    customerIdentifier: string;
    productCode: string;
  } | null;
};

export type InsertUserMutationMutationVariables = Exact<{
  object: UsersInsertInput;
}>;

export type InsertUserMutationMutation = {
  __typename?: "mutation_root";
  user?: { __typename?: "Users"; id: any; name?: string | null } | null;
};

export type UserQueryQueryVariables = Exact<{
  id: Scalars["uuid"]["input"];
}>;

export type UserQueryQuery = {
  __typename?: "query_root";
  user?: {
    __typename?: "Users";
    id: any;
    name?: string | null;
    email?: string | null;
  } | null;
};

export type CreateStripeCheckoutSessionMutationVariables = Exact<{
  priceId: Scalars["String"]["input"];
}>;

export type CreateStripeCheckoutSessionMutation = {
  __typename?: "mutation_root";
  createStripeCheckoutSession?: {
    __typename?: "CreateStripePortalSessionOutput";
    url: string;
  } | null;
};

export type CreateStripePortalSessionMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateStripePortalSessionMutation = {
  __typename?: "mutation_root";
  createStripePortalSession?: {
    __typename?: "CreateStripePortalSessionOutput";
    url: string;
  } | null;
};

export type CreateStripeSecretMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateStripeSecretMutation = {
  __typename?: "mutation_root";
  createStripeSecret?: {
    __typename?: "CreateStripeSecretOutput";
    secret: string;
  } | null;
};

export const DeleteAccountMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAccountMutation" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAccount" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteAccountMutationMutation,
  DeleteAccountMutationMutationVariables
>;
export const ResolveAwsMarketplaceCustomerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResolveAwsMarketplaceCustomer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "ResolveAwsMarketplaceCustomerInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resolveAwsMarketplaceCustomer" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "customerAWSAccountId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "customerIdentifier" },
                },
                { kind: "Field", name: { kind: "Name", value: "productCode" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResolveAwsMarketplaceCustomerMutation,
  ResolveAwsMarketplaceCustomerMutationVariables
>;
export const InsertUserMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "InsertUserMutation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "object" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UsersInsertInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "user" },
            name: { kind: "Name", value: "insertUsersOne" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "object" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "object" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "onConflict" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "constraint" },
                      value: { kind: "EnumValue", value: "profiles_pkey" },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "updateColumns" },
                      value: {
                        kind: "ListValue",
                        values: [{ kind: "EnumValue", value: "name" }],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InsertUserMutationMutation,
  InsertUserMutationMutationVariables
>;
export const UserQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "uuid" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "user" },
            name: { kind: "Name", value: "usersByPk" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserQueryQuery, UserQueryQueryVariables>;
export const CreateStripeCheckoutSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateStripeCheckoutSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "priceId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createStripeCheckoutSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "priceId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "priceId" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateStripeCheckoutSessionMutation,
  CreateStripeCheckoutSessionMutationVariables
>;
export const CreateStripePortalSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateStripePortalSession" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createStripePortalSession" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateStripePortalSessionMutation,
  CreateStripePortalSessionMutationVariables
>;
export const CreateStripeSecretDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateStripeSecret" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createStripeSecret" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "secret" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateStripeSecretMutation,
  CreateStripeSecretMutationVariables
>;
