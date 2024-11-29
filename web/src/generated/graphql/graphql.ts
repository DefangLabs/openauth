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
  uuid: { input: any; output: any };
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

/** Boolean expression to filter rows from the table "profiles". All fields are combined with a logical 'AND'. */
export type ProfilesBoolExp = {
  _and?: InputMaybe<Array<ProfilesBoolExp>>;
  _not?: InputMaybe<ProfilesBoolExp>;
  _or?: InputMaybe<Array<ProfilesBoolExp>>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "profiles" */
export enum ProfilesConstraint {
  /** unique or primary key constraint on columns "defangId" */
  ProfilesDefangIdKey = "profiles_defangId_key",
  /** unique or primary key constraint on columns "id" */
  ProfilesPkey = "profiles_pkey",
}

/** input type for inserting data into table "profiles" */
export type ProfilesInsertInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** on_conflict condition type for table "profiles" */
export type ProfilesOnConflict = {
  constraint: ProfilesConstraint;
  updateColumns?: Array<ProfilesUpdateColumn>;
  where?: InputMaybe<ProfilesBoolExp>;
};

/** Ordering options when selecting data from "profiles". */
export type ProfilesOrderBy = {
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: profiles */
export type ProfilesPkColumnsInput = {
  id: Scalars["uuid"]["input"];
};

/** select columns of table "profiles" */
export enum ProfilesSelectColumn {
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

/** input type for updating data in table "profiles" */
export type ProfilesSetInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** Streaming cursor of the table "profiles" */
export type ProfilesStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ProfilesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ProfilesStreamCursorValueInput = {
  id?: InputMaybe<Scalars["uuid"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** update columns of table "profiles" */
export enum ProfilesUpdateColumn {
  /** column name */
  Name = "name",
}

export type ProfilesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ProfilesSetInput>;
  /** filter the rows which have to be updated */
  where: ProfilesBoolExp;
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

export type InsertProfileMutationMutationVariables = Exact<{
  object: ProfilesInsertInput;
}>;

export type InsertProfileMutationMutation = {
  __typename?: "mutation_root";
  insertProfilesOne?: {
    __typename?: "Profiles";
    id: any;
    name?: string | null;
  } | null;
};

export type ProfileQueryQueryVariables = Exact<{
  id: Scalars["uuid"]["input"];
}>;

export type ProfileQueryQuery = {
  __typename?: "query_root";
  profilesByPk?: {
    __typename?: "Profiles";
    id: any;
    name?: string | null;
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
export const InsertProfileMutationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "InsertProfileMutation" },
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
              name: { kind: "Name", value: "ProfilesInsertInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "insertProfilesOne" },
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
  InsertProfileMutationMutation,
  InsertProfileMutationMutationVariables
>;
export const ProfileQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ProfileQuery" },
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
            name: { kind: "Name", value: "profilesByPk" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProfileQueryQuery, ProfileQueryQueryVariables>;
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
