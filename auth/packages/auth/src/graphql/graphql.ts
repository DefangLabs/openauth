/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  jsonb: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: string; output: string; }
};

/** columns and relationships of "accounts" */
export type Accounts = {
  __typename?: 'Accounts';
  /** An array relationship */
  accountsUserAccounts: Array<UserAccounts>;
  /** An aggregate relationship */
  accountsUserAccountsAggregate: UserAccountsAggregate;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email: Scalars['String']['output'];
  extra: Scalars['jsonb']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "accounts" */
export type AccountsAccountsUserAccountsArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


/** columns and relationships of "accounts" */
export type AccountsAccountsUserAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


/** columns and relationships of "accounts" */
export type AccountsExtraArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "accounts" */
export type AccountsAggregate = {
  __typename?: 'AccountsAggregate';
  aggregate?: Maybe<AccountsAggregateFields>;
  nodes: Array<Accounts>;
};

/** aggregate fields of "accounts" */
export type AccountsAggregateFields = {
  __typename?: 'AccountsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<AccountsMaxFields>;
  min?: Maybe<AccountsMinFields>;
};


/** aggregate fields of "accounts" */
export type AccountsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AccountsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AccountsAppendInput = {
  extra?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type AccountsBoolExp = {
  _and?: InputMaybe<Array<AccountsBoolExp>>;
  _not?: InputMaybe<AccountsBoolExp>;
  _or?: InputMaybe<Array<AccountsBoolExp>>;
  accountsUserAccounts?: InputMaybe<UserAccountsBoolExp>;
  accountsUserAccountsAggregate?: InputMaybe<UserAccountsAggregateBoolExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  extra?: InputMaybe<JsonbComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  provider?: InputMaybe<StringComparisonExp>;
  providerId?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "accounts" */
export enum AccountsConstraint {
  /** unique or primary key constraint on columns "id" */
  AccountsPkey = 'accounts_pkey',
  /** unique or primary key constraint on columns "provider", "providerId" */
  AccountsProviderProviderIdKey = 'accounts_provider_providerId_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AccountsDeleteAtPathInput = {
  extra?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AccountsDeleteElemInput = {
  extra?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AccountsDeleteKeyInput = {
  extra?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "accounts" */
export type AccountsInsertInput = {
  accountsUserAccounts?: InputMaybe<UserAccountsArrRelInsertInput>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  extra?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type AccountsMaxFields = {
  __typename?: 'AccountsMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type AccountsMinFields = {
  __typename?: 'AccountsMinFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "accounts" */
export type AccountsMutationResponse = {
  __typename?: 'AccountsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Accounts>;
};

/** input type for inserting object relation for remote table "accounts" */
export type AccountsObjRelInsertInput = {
  data: AccountsInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<AccountsOnConflict>;
};

/** on_conflict condition type for table "accounts" */
export type AccountsOnConflict = {
  constraint: AccountsConstraint;
  updateColumns?: Array<AccountsUpdateColumn>;
  where?: InputMaybe<AccountsBoolExp>;
};

/** Ordering options when selecting data from "accounts". */
export type AccountsOrderBy = {
  accountsUserAccountsAggregate?: InputMaybe<UserAccountsAggregateOrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  extra?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  provider?: InputMaybe<OrderBy>;
  providerId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: accounts */
export type AccountsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AccountsPrependInput = {
  extra?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "accounts" */
export enum AccountsSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Extra = 'extra',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "accounts" */
export type AccountsSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  extra?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "accounts" */
export type AccountsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AccountsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AccountsStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  extra?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "accounts" */
export enum AccountsUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Extra = 'extra',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AccountsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AccountsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<AccountsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<AccountsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<AccountsDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AccountsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AccountsSetInput>;
  /** filter the rows which have to be updated */
  where: AccountsBoolExp;
};

export type CreateStripeCheckoutSessionInput = {
  priceId: Scalars['String']['input'];
};

export type CreateStripePortalSessionOutput = {
  __typename?: 'CreateStripePortalSessionOutput';
  url: Scalars['String']['output'];
};

export type CreateStripeSecretOutput = {
  __typename?: 'CreateStripeSecretOutput';
  secret: Scalars['String']['output'];
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type DeleteUserOutput = {
  __typename?: 'DeleteUserOutput';
  message: Scalars['String']['output'];
};

export type InitiateTenantDeletionOutput = {
  __typename?: 'InitiateTenantDeletionOutput';
  message: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _containedIn?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _hasKey?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _hasKeysAll?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _hasKeysAny?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

export type ResolveAwsMarketplaceCustomerInput = {
  registrationToken: Scalars['String']['input'];
};

export type ResolveAwsMarketplaceCustomerOutput = {
  __typename?: 'ResolveAwsMarketplaceCustomerOutput';
  customerAWSAccountId: Scalars['String']['output'];
  customerIdentifier: Scalars['String']['output'];
  productCode: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "tenantMembers" */
export type TenantMembers = {
  __typename?: 'TenantMembers';
  createdAt: Scalars['timestamptz']['output'];
  role?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  tenant: Tenants;
  tenantId: Scalars['uuid']['output'];
  /** An object relationship */
  tenantRole?: Maybe<TenantRoles>;
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "tenantMembers" */
export type TenantMembersAggregate = {
  __typename?: 'TenantMembersAggregate';
  aggregate?: Maybe<TenantMembersAggregateFields>;
  nodes: Array<TenantMembers>;
};

export type TenantMembersAggregateBoolExp = {
  count?: InputMaybe<TenantMembersAggregateBoolExpCount>;
};

/** aggregate fields of "tenantMembers" */
export type TenantMembersAggregateFields = {
  __typename?: 'TenantMembersAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<TenantMembersMaxFields>;
  min?: Maybe<TenantMembersMinFields>;
};


/** aggregate fields of "tenantMembers" */
export type TenantMembersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<TenantMembersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  TenantMembersPkey = 'tenantMembers_pkey'
}

/** input type for inserting data into table "tenantMembers" */
export type TenantMembersInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  tenant?: InputMaybe<TenantsObjRelInsertInput>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  tenantRole?: InputMaybe<TenantRolesObjRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type TenantMembersMaxFields = {
  __typename?: 'TenantMembersMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "tenantMembers" */
export type TenantMembersMaxOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  tenantId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type TenantMembersMinFields = {
  __typename?: 'TenantMembersMinFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "tenantMembers" */
export type TenantMembersMinOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  tenantId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "tenantMembers" */
export type TenantMembersMutationResponse = {
  __typename?: 'TenantMembersMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<TenantMembers>;
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
  tenantId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};

/** select columns of table "tenantMembers" */
export enum TenantMembersSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Role = 'role',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "tenantMembers" */
export type TenantMembersSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
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
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "tenantMembers" */
export enum TenantMembersUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Role = 'role',
  /** column name */
  TenantId = 'tenantId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type TenantMembersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TenantMembersSetInput>;
  /** filter the rows which have to be updated */
  where: TenantMembersBoolExp;
};

/** columns and relationships of "tenantRoles" */
export type TenantRoles = {
  __typename?: 'TenantRoles';
  description: Scalars['String']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** An array relationship */
  tenantMembers: Array<TenantMembers>;
  /** An aggregate relationship */
  tenantMembersAggregate: TenantMembersAggregate;
};


/** columns and relationships of "tenantRoles" */
export type TenantRolesTenantMembersArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


/** columns and relationships of "tenantRoles" */
export type TenantRolesTenantMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};

/** aggregated selection of "tenantRoles" */
export type TenantRolesAggregate = {
  __typename?: 'TenantRolesAggregate';
  aggregate?: Maybe<TenantRolesAggregateFields>;
  nodes: Array<TenantRoles>;
};

/** aggregate fields of "tenantRoles" */
export type TenantRolesAggregateFields = {
  __typename?: 'TenantRolesAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<TenantRolesMaxFields>;
  min?: Maybe<TenantRolesMinFields>;
};


/** aggregate fields of "tenantRoles" */
export type TenantRolesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<TenantRolesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateBoolExp>;
};

/** unique or primary key constraints on table "tenantRoles" */
export enum TenantRolesConstraint {
  /** unique or primary key constraint on columns "name" */
  TenantRolesPkey = 'tenantRoles_pkey'
}

/** input type for inserting data into table "tenantRoles" */
export type TenantRolesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantMembers?: InputMaybe<TenantMembersArrRelInsertInput>;
};

/** aggregate max on columns */
export type TenantRolesMaxFields = {
  __typename?: 'TenantRolesMaxFields';
  description?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type TenantRolesMinFields = {
  __typename?: 'TenantRolesMinFields';
  description?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "tenantRoles" */
export type TenantRolesMutationResponse = {
  __typename?: 'TenantRolesMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<TenantRoles>;
};

/** input type for inserting object relation for remote table "tenantRoles" */
export type TenantRolesObjRelInsertInput = {
  data: TenantRolesInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<TenantRolesOnConflict>;
};

/** on_conflict condition type for table "tenantRoles" */
export type TenantRolesOnConflict = {
  constraint: TenantRolesConstraint;
  updateColumns?: Array<TenantRolesUpdateColumn>;
  where?: InputMaybe<TenantRolesBoolExp>;
};

/** Ordering options when selecting data from "tenantRoles". */
export type TenantRolesOrderBy = {
  description?: InputMaybe<OrderBy>;
  label?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateOrderBy>;
};

/** primary key columns input for table: tenantRoles */
export type TenantRolesPkColumnsInput = {
  name: Scalars['String']['input'];
};

/** select columns of table "tenantRoles" */
export enum TenantRolesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Label = 'label',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "tenantRoles" */
export type TenantRolesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "tenantRoles" */
export type TenantRolesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: TenantRolesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TenantRolesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "tenantRoles" */
export enum TenantRolesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Label = 'label',
  /** column name */
  Name = 'name'
}

export type TenantRolesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TenantRolesSetInput>;
  /** filter the rows which have to be updated */
  where: TenantRolesBoolExp;
};

/** columns and relationships of "tenants" */
export type Tenants = {
  __typename?: 'Tenants';
  awsMarketplaceAccountId?: Maybe<Scalars['String']['output']>;
  awsMarketplaceCustomerIdentifier?: Maybe<Scalars['String']['output']>;
  awsMarketplaceProductCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  owner: Users;
  ownerId: Scalars['uuid']['output'];
  provider: Scalars['String']['output'];
  /** An array relationship */
  tenantMembers: Array<TenantMembers>;
  /** An aggregate relationship */
  tenantMembersAggregate: TenantMembersAggregate;
  updatedAt: Scalars['timestamptz']['output'];
};


/** columns and relationships of "tenants" */
export type TenantsTenantMembersArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


/** columns and relationships of "tenants" */
export type TenantsTenantMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};

/** aggregated selection of "tenants" */
export type TenantsAggregate = {
  __typename?: 'TenantsAggregate';
  aggregate?: Maybe<TenantsAggregateFields>;
  nodes: Array<Tenants>;
};

export type TenantsAggregateBoolExp = {
  count?: InputMaybe<TenantsAggregateBoolExpCount>;
};

/** aggregate fields of "tenants" */
export type TenantsAggregateFields = {
  __typename?: 'TenantsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<TenantsMaxFields>;
  min?: Maybe<TenantsMinFields>;
};


/** aggregate fields of "tenants" */
export type TenantsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<TenantsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
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
  awsMarketplaceAccountId?: InputMaybe<StringComparisonExp>;
  awsMarketplaceCustomerIdentifier?: InputMaybe<StringComparisonExp>;
  awsMarketplaceProductCode?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<UsersBoolExp>;
  ownerId?: InputMaybe<UuidComparisonExp>;
  provider?: InputMaybe<StringComparisonExp>;
  tenantMembers?: InputMaybe<TenantMembersBoolExp>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "tenants" */
export enum TenantsConstraint {
  /** unique or primary key constraint on columns "awsMarketplaceCustomerIdentifier" */
  TenantsAwsMarketplaceCustomerIdentifierKey = 'tenants_awsMarketplaceCustomerIdentifier_key',
  /** unique or primary key constraint on columns "id" */
  TenantsPkey = 'tenants_pkey'
}

/** input type for inserting data into table "tenants" */
export type TenantsInsertInput = {
  awsMarketplaceAccountId?: InputMaybe<Scalars['String']['input']>;
  awsMarketplaceCustomerIdentifier?: InputMaybe<Scalars['String']['input']>;
  awsMarketplaceProductCode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<UsersObjRelInsertInput>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  tenantMembers?: InputMaybe<TenantMembersArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type TenantsMaxFields = {
  __typename?: 'TenantsMaxFields';
  awsMarketplaceAccountId?: Maybe<Scalars['String']['output']>;
  awsMarketplaceCustomerIdentifier?: Maybe<Scalars['String']['output']>;
  awsMarketplaceProductCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "tenants" */
export type TenantsMaxOrderBy = {
  awsMarketplaceAccountId?: InputMaybe<OrderBy>;
  awsMarketplaceCustomerIdentifier?: InputMaybe<OrderBy>;
  awsMarketplaceProductCode?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  provider?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type TenantsMinFields = {
  __typename?: 'TenantsMinFields';
  awsMarketplaceAccountId?: Maybe<Scalars['String']['output']>;
  awsMarketplaceCustomerIdentifier?: Maybe<Scalars['String']['output']>;
  awsMarketplaceProductCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "tenants" */
export type TenantsMinOrderBy = {
  awsMarketplaceAccountId?: InputMaybe<OrderBy>;
  awsMarketplaceCustomerIdentifier?: InputMaybe<OrderBy>;
  awsMarketplaceProductCode?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  provider?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "tenants" */
export type TenantsMutationResponse = {
  __typename?: 'TenantsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tenants>;
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
  awsMarketplaceAccountId?: InputMaybe<OrderBy>;
  awsMarketplaceCustomerIdentifier?: InputMaybe<OrderBy>;
  awsMarketplaceProductCode?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  owner?: InputMaybe<UsersOrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  provider?: InputMaybe<OrderBy>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: tenants */
export type TenantsPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "tenants" */
export enum TenantsSelectColumn {
  /** column name */
  AwsMarketplaceAccountId = 'awsMarketplaceAccountId',
  /** column name */
  AwsMarketplaceCustomerIdentifier = 'awsMarketplaceCustomerIdentifier',
  /** column name */
  AwsMarketplaceProductCode = 'awsMarketplaceProductCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  Provider = 'provider',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "tenants" */
export type TenantsSetInput = {
  awsMarketplaceAccountId?: InputMaybe<Scalars['String']['input']>;
  awsMarketplaceCustomerIdentifier?: InputMaybe<Scalars['String']['input']>;
  awsMarketplaceProductCode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "tenants" */
export type TenantsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: TenantsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type TenantsStreamCursorValueInput = {
  awsMarketplaceAccountId?: InputMaybe<Scalars['String']['input']>;
  awsMarketplaceCustomerIdentifier?: InputMaybe<Scalars['String']['input']>;
  awsMarketplaceProductCode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "tenants" */
export enum TenantsUpdateColumn {
  /** column name */
  AwsMarketplaceAccountId = 'awsMarketplaceAccountId',
  /** column name */
  AwsMarketplaceCustomerIdentifier = 'awsMarketplaceCustomerIdentifier',
  /** column name */
  AwsMarketplaceProductCode = 'awsMarketplaceProductCode',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'ownerId',
  /** column name */
  Provider = 'provider',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type TenantsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<TenantsSetInput>;
  /** filter the rows which have to be updated */
  where: TenantsBoolExp;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "userAccounts" */
export type UserAccounts = {
  __typename?: 'UserAccounts';
  accountId: Scalars['uuid']['output'];
  createdAt: Scalars['timestamptz']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  userAccountsAccount: Accounts;
  /** An object relationship */
  userAccountsUser: Users;
  userId: Scalars['uuid']['output'];
};

/** aggregated selection of "userAccounts" */
export type UserAccountsAggregate = {
  __typename?: 'UserAccountsAggregate';
  aggregate?: Maybe<UserAccountsAggregateFields>;
  nodes: Array<UserAccounts>;
};

export type UserAccountsAggregateBoolExp = {
  count?: InputMaybe<UserAccountsAggregateBoolExpCount>;
};

/** aggregate fields of "userAccounts" */
export type UserAccountsAggregateFields = {
  __typename?: 'UserAccountsAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<UserAccountsMaxFields>;
  min?: Maybe<UserAccountsMinFields>;
};


/** aggregate fields of "userAccounts" */
export type UserAccountsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UserAccountsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "userAccounts" */
export type UserAccountsAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<UserAccountsMaxOrderBy>;
  min?: InputMaybe<UserAccountsMinOrderBy>;
};

/** input type for inserting array relation for remote table "userAccounts" */
export type UserAccountsArrRelInsertInput = {
  data: Array<UserAccountsInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<UserAccountsOnConflict>;
};

/** Boolean expression to filter rows from the table "userAccounts". All fields are combined with a logical 'AND'. */
export type UserAccountsBoolExp = {
  _and?: InputMaybe<Array<UserAccountsBoolExp>>;
  _not?: InputMaybe<UserAccountsBoolExp>;
  _or?: InputMaybe<Array<UserAccountsBoolExp>>;
  accountId?: InputMaybe<UuidComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  userAccountsAccount?: InputMaybe<AccountsBoolExp>;
  userAccountsUser?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "userAccounts" */
export enum UserAccountsConstraint {
  /** unique or primary key constraint on columns "accountId", "userId" */
  UserAccountsPkey = 'userAccounts_pkey'
}

/** input type for inserting data into table "userAccounts" */
export type UserAccountsInsertInput = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userAccountsAccount?: InputMaybe<AccountsObjRelInsertInput>;
  userAccountsUser?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type UserAccountsMaxFields = {
  __typename?: 'UserAccountsMaxFields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "userAccounts" */
export type UserAccountsMaxOrderBy = {
  accountId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type UserAccountsMinFields = {
  __typename?: 'UserAccountsMinFields';
  accountId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  userId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "userAccounts" */
export type UserAccountsMinOrderBy = {
  accountId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "userAccounts" */
export type UserAccountsMutationResponse = {
  __typename?: 'UserAccountsMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<UserAccounts>;
};

/** on_conflict condition type for table "userAccounts" */
export type UserAccountsOnConflict = {
  constraint: UserAccountsConstraint;
  updateColumns?: Array<UserAccountsUpdateColumn>;
  where?: InputMaybe<UserAccountsBoolExp>;
};

/** Ordering options when selecting data from "userAccounts". */
export type UserAccountsOrderBy = {
  accountId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userAccountsAccount?: InputMaybe<AccountsOrderBy>;
  userAccountsUser?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: userAccounts */
export type UserAccountsPkColumnsInput = {
  accountId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};

/** select columns of table "userAccounts" */
export enum UserAccountsSelectColumn {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "userAccounts" */
export type UserAccountsSetInput = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "userAccounts" */
export type UserAccountsStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UserAccountsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserAccountsStreamCursorValueInput = {
  accountId?: InputMaybe<Scalars['uuid']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "userAccounts" */
export enum UserAccountsUpdateColumn {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type UserAccountsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UserAccountsSetInput>;
  /** filter the rows which have to be updated */
  where: UserAccountsBoolExp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'Users';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  tenantMembers: Array<TenantMembers>;
  /** An aggregate relationship */
  tenantMembersAggregate: TenantMembersAggregate;
  /** An array relationship */
  tenants: Array<Tenants>;
  /** An aggregate relationship */
  tenantsAggregate: TenantsAggregate;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  usersUserAccounts: Array<UserAccounts>;
  /** An aggregate relationship */
  usersUserAccountsAggregate: UserAccountsAggregate;
};


/** columns and relationships of "users" */
export type UsersTenantMembersArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


/** columns and relationships of "users" */
export type UsersTenantMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


/** columns and relationships of "users" */
export type UsersTenantsArgs = {
  distinctOn?: InputMaybe<Array<TenantsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
  where?: InputMaybe<TenantsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersTenantsAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
  where?: InputMaybe<TenantsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersUsersUserAccountsArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


/** columns and relationships of "users" */
export type UsersUsersUserAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  tenantMembers?: InputMaybe<TenantMembersBoolExp>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateBoolExp>;
  tenants?: InputMaybe<TenantsBoolExp>;
  tenantsAggregate?: InputMaybe<TenantsAggregateBoolExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  usersUserAccounts?: InputMaybe<UserAccountsBoolExp>;
  usersUserAccountsAggregate?: InputMaybe<UserAccountsAggregateBoolExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "id" */
  ProfilesPkey = 'profiles_pkey'
}

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tenantMembers?: InputMaybe<TenantMembersArrRelInsertInput>;
  tenants?: InputMaybe<TenantsArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  usersUserAccounts?: InputMaybe<UserAccountsArrRelInsertInput>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
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
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  tenantMembersAggregate?: InputMaybe<TenantMembersAggregateOrderBy>;
  tenantsAggregate?: InputMaybe<TenantsAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  usersUserAccountsAggregate?: InputMaybe<UserAccountsAggregateOrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
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
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type UsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  createStripeCheckoutSession?: Maybe<CreateStripePortalSessionOutput>;
  /** Create a Stripe portal session */
  createStripePortalSession?: Maybe<CreateStripePortalSessionOutput>;
  /** Create a Stripe client secret */
  createStripeSecret?: Maybe<CreateStripeSecretOutput>;
  /** delete data from the table: "accounts" */
  deleteAccounts?: Maybe<AccountsMutationResponse>;
  /** delete single row from the table: "accounts" */
  deleteAccountsByPk?: Maybe<Accounts>;
  /** delete data from the table: "tenantMembers" */
  deleteTenantMembers?: Maybe<TenantMembersMutationResponse>;
  /** delete single row from the table: "tenantMembers" */
  deleteTenantMembersByPk?: Maybe<TenantMembers>;
  /** delete data from the table: "tenantRoles" */
  deleteTenantRoles?: Maybe<TenantRolesMutationResponse>;
  /** delete single row from the table: "tenantRoles" */
  deleteTenantRolesByPk?: Maybe<TenantRoles>;
  /** delete data from the table: "tenants" */
  deleteTenants?: Maybe<TenantsMutationResponse>;
  /** delete single row from the table: "tenants" */
  deleteTenantsByPk?: Maybe<Tenants>;
  deleteUser?: Maybe<DeleteUserOutput>;
  /** delete data from the table: "userAccounts" */
  deleteUserAccounts?: Maybe<UserAccountsMutationResponse>;
  /** delete single row from the table: "userAccounts" */
  deleteUserAccountsByPk?: Maybe<UserAccounts>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  initiateTenantDeletion?: Maybe<InitiateTenantDeletionOutput>;
  /** insert data into the table: "accounts" */
  insertAccounts?: Maybe<AccountsMutationResponse>;
  /** insert a single row into the table: "accounts" */
  insertAccountsOne?: Maybe<Accounts>;
  /** insert data into the table: "tenantMembers" */
  insertTenantMembers?: Maybe<TenantMembersMutationResponse>;
  /** insert a single row into the table: "tenantMembers" */
  insertTenantMembersOne?: Maybe<TenantMembers>;
  /** insert data into the table: "tenantRoles" */
  insertTenantRoles?: Maybe<TenantRolesMutationResponse>;
  /** insert a single row into the table: "tenantRoles" */
  insertTenantRolesOne?: Maybe<TenantRoles>;
  /** insert data into the table: "tenants" */
  insertTenants?: Maybe<TenantsMutationResponse>;
  /** insert a single row into the table: "tenants" */
  insertTenantsOne?: Maybe<Tenants>;
  /** insert data into the table: "userAccounts" */
  insertUserAccounts?: Maybe<UserAccountsMutationResponse>;
  /** insert a single row into the table: "userAccounts" */
  insertUserAccountsOne?: Maybe<UserAccounts>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  resolveAwsMarketplaceCustomer?: Maybe<ResolveAwsMarketplaceCustomerOutput>;
  /** update data of the table: "accounts" */
  updateAccounts?: Maybe<AccountsMutationResponse>;
  /** update single row of the table: "accounts" */
  updateAccountsByPk?: Maybe<Accounts>;
  /** update multiples rows of table: "accounts" */
  updateAccountsMany?: Maybe<Array<Maybe<AccountsMutationResponse>>>;
  /** update data of the table: "tenantMembers" */
  updateTenantMembers?: Maybe<TenantMembersMutationResponse>;
  /** update single row of the table: "tenantMembers" */
  updateTenantMembersByPk?: Maybe<TenantMembers>;
  /** update multiples rows of table: "tenantMembers" */
  updateTenantMembersMany?: Maybe<Array<Maybe<TenantMembersMutationResponse>>>;
  /** update data of the table: "tenantRoles" */
  updateTenantRoles?: Maybe<TenantRolesMutationResponse>;
  /** update single row of the table: "tenantRoles" */
  updateTenantRolesByPk?: Maybe<TenantRoles>;
  /** update multiples rows of table: "tenantRoles" */
  updateTenantRolesMany?: Maybe<Array<Maybe<TenantRolesMutationResponse>>>;
  /** update data of the table: "tenants" */
  updateTenants?: Maybe<TenantsMutationResponse>;
  /** update single row of the table: "tenants" */
  updateTenantsByPk?: Maybe<Tenants>;
  /** update multiples rows of table: "tenants" */
  updateTenantsMany?: Maybe<Array<Maybe<TenantsMutationResponse>>>;
  /** update data of the table: "userAccounts" */
  updateUserAccounts?: Maybe<UserAccountsMutationResponse>;
  /** update single row of the table: "userAccounts" */
  updateUserAccountsByPk?: Maybe<UserAccounts>;
  /** update multiples rows of table: "userAccounts" */
  updateUserAccountsMany?: Maybe<Array<Maybe<UserAccountsMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootCreateStripeCheckoutSessionArgs = {
  input: CreateStripeCheckoutSessionInput;
};


/** mutation root */
export type Mutation_RootDeleteAccountsArgs = {
  where: AccountsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAccountsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTenantMembersArgs = {
  where: TenantMembersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteTenantMembersByPkArgs = {
  tenantId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTenantRolesArgs = {
  where: TenantRolesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteTenantRolesByPkArgs = {
  name: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteTenantsArgs = {
  where: TenantsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteTenantsByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteUserAccountsArgs = {
  where: UserAccountsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUserAccountsByPkArgs = {
  accountId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInitiateTenantDeletionArgs = {
  tenantId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsertAccountsArgs = {
  objects: Array<AccountsInsertInput>;
  onConflict?: InputMaybe<AccountsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAccountsOneArgs = {
  object: AccountsInsertInput;
  onConflict?: InputMaybe<AccountsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTenantMembersArgs = {
  objects: Array<TenantMembersInsertInput>;
  onConflict?: InputMaybe<TenantMembersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTenantMembersOneArgs = {
  object: TenantMembersInsertInput;
  onConflict?: InputMaybe<TenantMembersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTenantRolesArgs = {
  objects: Array<TenantRolesInsertInput>;
  onConflict?: InputMaybe<TenantRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTenantRolesOneArgs = {
  object: TenantRolesInsertInput;
  onConflict?: InputMaybe<TenantRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTenantsArgs = {
  objects: Array<TenantsInsertInput>;
  onConflict?: InputMaybe<TenantsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTenantsOneArgs = {
  object: TenantsInsertInput;
  onConflict?: InputMaybe<TenantsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserAccountsArgs = {
  objects: Array<UserAccountsInsertInput>;
  onConflict?: InputMaybe<UserAccountsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserAccountsOneArgs = {
  object: UserAccountsInsertInput;
  onConflict?: InputMaybe<UserAccountsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootResolveAwsMarketplaceCustomerArgs = {
  input: ResolveAwsMarketplaceCustomerInput;
};


/** mutation root */
export type Mutation_RootUpdateAccountsArgs = {
  _append?: InputMaybe<AccountsAppendInput>;
  _deleteAtPath?: InputMaybe<AccountsDeleteAtPathInput>;
  _deleteElem?: InputMaybe<AccountsDeleteElemInput>;
  _deleteKey?: InputMaybe<AccountsDeleteKeyInput>;
  _prepend?: InputMaybe<AccountsPrependInput>;
  _set?: InputMaybe<AccountsSetInput>;
  where: AccountsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAccountsByPkArgs = {
  _append?: InputMaybe<AccountsAppendInput>;
  _deleteAtPath?: InputMaybe<AccountsDeleteAtPathInput>;
  _deleteElem?: InputMaybe<AccountsDeleteElemInput>;
  _deleteKey?: InputMaybe<AccountsDeleteKeyInput>;
  _prepend?: InputMaybe<AccountsPrependInput>;
  _set?: InputMaybe<AccountsSetInput>;
  pkColumns: AccountsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAccountsManyArgs = {
  updates: Array<AccountsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateTenantMembersArgs = {
  _set?: InputMaybe<TenantMembersSetInput>;
  where: TenantMembersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateTenantMembersByPkArgs = {
  _set?: InputMaybe<TenantMembersSetInput>;
  pkColumns: TenantMembersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateTenantMembersManyArgs = {
  updates: Array<TenantMembersUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateTenantRolesArgs = {
  _set?: InputMaybe<TenantRolesSetInput>;
  where: TenantRolesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateTenantRolesByPkArgs = {
  _set?: InputMaybe<TenantRolesSetInput>;
  pkColumns: TenantRolesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateTenantRolesManyArgs = {
  updates: Array<TenantRolesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateTenantsArgs = {
  _set?: InputMaybe<TenantsSetInput>;
  where: TenantsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateTenantsByPkArgs = {
  _set?: InputMaybe<TenantsSetInput>;
  pkColumns: TenantsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateTenantsManyArgs = {
  updates: Array<TenantsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUserAccountsArgs = {
  _set?: InputMaybe<UserAccountsSetInput>;
  where: UserAccountsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUserAccountsByPkArgs = {
  _set?: InputMaybe<UserAccountsSetInput>;
  pkColumns: UserAccountsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUserAccountsManyArgs = {
  updates: Array<UserAccountsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersByPkArgs = {
  _set?: InputMaybe<UsersSetInput>;
  pkColumns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accountsAggregate: AccountsAggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accountsByPk?: Maybe<Accounts>;
  /** An array relationship */
  tenantMembers: Array<TenantMembers>;
  /** An aggregate relationship */
  tenantMembersAggregate: TenantMembersAggregate;
  /** fetch data from the table: "tenantMembers" using primary key columns */
  tenantMembersByPk?: Maybe<TenantMembers>;
  /** fetch data from the table: "tenantRoles" */
  tenantRoles: Array<TenantRoles>;
  /** fetch aggregated fields from the table: "tenantRoles" */
  tenantRolesAggregate: TenantRolesAggregate;
  /** fetch data from the table: "tenantRoles" using primary key columns */
  tenantRolesByPk?: Maybe<TenantRoles>;
  /** An array relationship */
  tenants: Array<Tenants>;
  /** An aggregate relationship */
  tenantsAggregate: TenantsAggregate;
  /** fetch data from the table: "tenants" using primary key columns */
  tenantsByPk?: Maybe<Tenants>;
  /** fetch data from the table: "userAccounts" */
  userAccounts: Array<UserAccounts>;
  /** fetch aggregated fields from the table: "userAccounts" */
  userAccountsAggregate: UserAccountsAggregate;
  /** fetch data from the table: "userAccounts" using primary key columns */
  userAccountsByPk?: Maybe<UserAccounts>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type Query_RootAccountsArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Query_RootAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Query_RootAccountsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTenantMembersArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


export type Query_RootTenantMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


export type Query_RootTenantMembersByPkArgs = {
  tenantId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Query_RootTenantRolesArgs = {
  distinctOn?: InputMaybe<Array<TenantRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantRolesOrderBy>>;
  where?: InputMaybe<TenantRolesBoolExp>;
};


export type Query_RootTenantRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantRolesOrderBy>>;
  where?: InputMaybe<TenantRolesBoolExp>;
};


export type Query_RootTenantRolesByPkArgs = {
  name: Scalars['String']['input'];
};


export type Query_RootTenantsArgs = {
  distinctOn?: InputMaybe<Array<TenantsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
  where?: InputMaybe<TenantsBoolExp>;
};


export type Query_RootTenantsAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
  where?: InputMaybe<TenantsBoolExp>;
};


export type Query_RootTenantsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUserAccountsArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


export type Query_RootUserAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


export type Query_RootUserAccountsByPkArgs = {
  accountId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accountsAggregate: AccountsAggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accountsByPk?: Maybe<Accounts>;
  /** fetch data from the table in a streaming manner: "accounts" */
  accountsStream: Array<Accounts>;
  /** An array relationship */
  tenantMembers: Array<TenantMembers>;
  /** An aggregate relationship */
  tenantMembersAggregate: TenantMembersAggregate;
  /** fetch data from the table: "tenantMembers" using primary key columns */
  tenantMembersByPk?: Maybe<TenantMembers>;
  /** fetch data from the table in a streaming manner: "tenantMembers" */
  tenantMembersStream: Array<TenantMembers>;
  /** fetch data from the table: "tenantRoles" */
  tenantRoles: Array<TenantRoles>;
  /** fetch aggregated fields from the table: "tenantRoles" */
  tenantRolesAggregate: TenantRolesAggregate;
  /** fetch data from the table: "tenantRoles" using primary key columns */
  tenantRolesByPk?: Maybe<TenantRoles>;
  /** fetch data from the table in a streaming manner: "tenantRoles" */
  tenantRolesStream: Array<TenantRoles>;
  /** An array relationship */
  tenants: Array<Tenants>;
  /** An aggregate relationship */
  tenantsAggregate: TenantsAggregate;
  /** fetch data from the table: "tenants" using primary key columns */
  tenantsByPk?: Maybe<Tenants>;
  /** fetch data from the table in a streaming manner: "tenants" */
  tenantsStream: Array<Tenants>;
  /** fetch data from the table: "userAccounts" */
  userAccounts: Array<UserAccounts>;
  /** fetch aggregated fields from the table: "userAccounts" */
  userAccountsAggregate: UserAccountsAggregate;
  /** fetch data from the table: "userAccounts" using primary key columns */
  userAccountsByPk?: Maybe<UserAccounts>;
  /** fetch data from the table in a streaming manner: "userAccounts" */
  userAccountsStream: Array<UserAccounts>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  usersStream: Array<Users>;
};


export type Subscription_RootAccountsArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Subscription_RootAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<AccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountsOrderBy>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Subscription_RootAccountsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAccountsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AccountsStreamCursorInput>>;
  where?: InputMaybe<AccountsBoolExp>;
};


export type Subscription_RootTenantMembersArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


export type Subscription_RootTenantMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantMembersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantMembersOrderBy>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


export type Subscription_RootTenantMembersByPkArgs = {
  tenantId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Subscription_RootTenantMembersStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TenantMembersStreamCursorInput>>;
  where?: InputMaybe<TenantMembersBoolExp>;
};


export type Subscription_RootTenantRolesArgs = {
  distinctOn?: InputMaybe<Array<TenantRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantRolesOrderBy>>;
  where?: InputMaybe<TenantRolesBoolExp>;
};


export type Subscription_RootTenantRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantRolesOrderBy>>;
  where?: InputMaybe<TenantRolesBoolExp>;
};


export type Subscription_RootTenantRolesByPkArgs = {
  name: Scalars['String']['input'];
};


export type Subscription_RootTenantRolesStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TenantRolesStreamCursorInput>>;
  where?: InputMaybe<TenantRolesBoolExp>;
};


export type Subscription_RootTenantsArgs = {
  distinctOn?: InputMaybe<Array<TenantsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
  where?: InputMaybe<TenantsBoolExp>;
};


export type Subscription_RootTenantsAggregateArgs = {
  distinctOn?: InputMaybe<Array<TenantsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TenantsOrderBy>>;
  where?: InputMaybe<TenantsBoolExp>;
};


export type Subscription_RootTenantsByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTenantsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<TenantsStreamCursorInput>>;
  where?: InputMaybe<TenantsBoolExp>;
};


export type Subscription_RootUserAccountsArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


export type Subscription_RootUserAccountsAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserAccountsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserAccountsOrderBy>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


export type Subscription_RootUserAccountsByPkArgs = {
  accountId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
};


export type Subscription_RootUserAccountsStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserAccountsStreamCursorInput>>;
  where?: InputMaybe<UserAccountsBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UsersStreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

export type TenantMembersAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<TenantMembersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TenantMembersBoolExp>;
  predicate: IntComparisonExp;
};

export type TenantsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<TenantsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TenantsBoolExp>;
  predicate: IntComparisonExp;
};

export type UserAccountsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<UserAccountsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<UserAccountsBoolExp>;
  predicate: IntComparisonExp;
};

export type UpsertAccountMutationVariables = Exact<{
  object: AccountsInsertInput;
  onConflict?: InputMaybe<AccountsOnConflict>;
}>;


export type UpsertAccountMutation = { __typename?: 'mutation_root', account?: { __typename?: 'Accounts', id: string, name: string, email: string, extra: any } | null };

export type TenantByPkQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type TenantByPkQuery = { __typename?: 'query_root', tenant?: { __typename?: 'Tenants', id: string, name: string } | null };

export type InsertTenantMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
  ownerId: Scalars['uuid']['input'];
  provider: Scalars['String']['input'];
}>;


export type InsertTenantMutation = { __typename?: 'mutation_root', tenant?: { __typename?: 'Tenants', id: string, name: string } | null };

export type ListTenantsQueryVariables = Exact<{
  ownerId: Scalars['uuid']['input'];
}>;


export type ListTenantsQuery = { __typename?: 'query_root', tenants: Array<{ __typename?: 'Tenants', id: string, name: string }> };

export type CreateDefaultTenantMutationVariables = Exact<{
  name: Scalars['String']['input'];
  ownerId: Scalars['uuid']['input'];
}>;


export type CreateDefaultTenantMutation = { __typename?: 'mutation_root', tenant?: { __typename?: 'Tenants', id: string, name: string } | null };

export type ExternalTenantsQueryVariables = Exact<{
  ids: Array<Scalars['uuid']['input']> | Scalars['uuid']['input'];
}>;


export type ExternalTenantsQuery = { __typename?: 'query_root', tenants: Array<{ __typename?: 'Tenants', id: string, name: string }> };

export type UserInfoQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type UserInfoQuery = { __typename?: 'query_root', userinfo?: { __typename?: 'Users', id: string, email?: string | null, name?: string | null, createdAt?: any | null, updatedAt?: any | null, accounts: Array<{ __typename?: 'UserAccounts', account: { __typename?: 'Accounts', id: string, provider: string, providerId: string, name: string, email: string, createdAt?: any | null, updatedAt?: any | null } }>, ownedTenants: Array<{ __typename?: 'Tenants', id: string, name: string }>, tenantMemberships: Array<{ __typename?: 'TenantMembers', role?: string | null, tenant: { __typename?: 'Tenants', id: string, name: string } }> } | null };

export type UsersForAccountQueryVariables = Exact<{
  accountId: Scalars['uuid']['input'];
}>;


export type UsersForAccountQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'Users', id: string }> };

export type UpsertAccountUserMutationVariables = Exact<{
  object: UsersInsertInput;
  onConflict: UsersOnConflict;
}>;


export type UpsertAccountUserMutation = { __typename?: 'mutation_root', user?: { __typename?: 'Users', id: string, name?: string | null, email?: string | null, usersUserAccounts: Array<{ __typename?: 'UserAccounts', userAccountsAccount: { __typename?: 'Accounts', provider: string, extra: any } }> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const UpsertAccountDocument = new TypedDocumentString(`
    mutation UpsertAccount($object: AccountsInsertInput!, $onConflict: AccountsOnConflict) {
  account: insertAccountsOne(object: $object, onConflict: $onConflict) {
    id
    name
    email
    extra
  }
}
    `) as unknown as TypedDocumentString<UpsertAccountMutation, UpsertAccountMutationVariables>;
export const TenantByPkDocument = new TypedDocumentString(`
    query TenantByPk($id: uuid!) {
  tenant: tenantsByPk(id: $id) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<TenantByPkQuery, TenantByPkQueryVariables>;
export const InsertTenantDocument = new TypedDocumentString(`
    mutation InsertTenant($id: uuid!, $name: String!, $ownerId: uuid!, $provider: String!) {
  tenant: insertTenantsOne(
    object: {id: $id, name: $name, ownerId: $ownerId, provider: $provider}
  ) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<InsertTenantMutation, InsertTenantMutationVariables>;
export const ListTenantsDocument = new TypedDocumentString(`
    query ListTenants($ownerId: uuid!) {
  tenants(where: {ownerId: {_eq: $ownerId}}, orderBy: {createdAt: ASC}) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<ListTenantsQuery, ListTenantsQueryVariables>;
export const CreateDefaultTenantDocument = new TypedDocumentString(`
    mutation CreateDefaultTenant($name: String!, $ownerId: uuid!) {
  tenant: insertTenantsOne(object: {id: $ownerId, name: $name, ownerId: $ownerId}) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<CreateDefaultTenantMutation, CreateDefaultTenantMutationVariables>;
export const ExternalTenantsDocument = new TypedDocumentString(`
    query ExternalTenants($ids: [uuid!]!) {
  tenants(where: {id: {_in: $ids}}) {
    id
    name
  }
}
    `) as unknown as TypedDocumentString<ExternalTenantsQuery, ExternalTenantsQueryVariables>;
export const UserInfoDocument = new TypedDocumentString(`
    query UserInfo($id: uuid!) {
  userinfo: usersByPk(id: $id) {
    id
    email
    name
    createdAt
    updatedAt
    accounts: usersUserAccounts {
      account: userAccountsAccount {
        id
        provider
        providerId
        name
        email
        createdAt
        updatedAt
      }
    }
    ownedTenants: tenants {
      id
      name
    }
    tenantMemberships: tenantMembers {
      role
      tenant {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UserInfoQuery, UserInfoQueryVariables>;
export const UsersForAccountDocument = new TypedDocumentString(`
    query UsersForAccount($accountId: uuid!) {
  users(where: {usersUserAccounts: {accountId: {_eq: $accountId}}}) {
    id
  }
}
    `) as unknown as TypedDocumentString<UsersForAccountQuery, UsersForAccountQueryVariables>;
export const UpsertAccountUserDocument = new TypedDocumentString(`
    mutation UpsertAccountUser($object: UsersInsertInput!, $onConflict: UsersOnConflict!) {
  user: insertUsersOne(object: $object, onConflict: $onConflict) {
    id
    name
    email
    usersUserAccounts {
      userAccountsAccount {
        provider
        extra
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpsertAccountUserMutation, UpsertAccountUserMutationVariables>;