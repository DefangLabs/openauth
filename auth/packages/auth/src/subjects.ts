import { createSubjects } from "@openauthjs/openauth/subject";
import * as v from "valibot";

export const userPropertiesSchema = v.object({
  id: v.string(),
  tenant: v.string(),
  hasura: v.object({
    "x-hasura-default-role": v.string(),
    "x-hasura-allowed-roles": v.array(v.string()),
    "x-hasura-user-id": v.string(),
  }),
  // List of GitHub organization names the user belongs to.
  // This field is maintained for backwards compatibility with
  // existing clients and may be removed in a future version.
  githubOrgs: v.optional(
    v.array(v.string())
  ),
  /**
   * UUIDs for tenants managed by external providers. These IDs are
   * generated using UUID v5 so the same organization always maps to
   * the same tenant ID across logins.
   */
  externalTenants: v.optional(
    v.array(v.string())
  ),
});

export type UserProperties = v.InferOutput<typeof userPropertiesSchema>;

export const subjects = createSubjects({
  user: userPropertiesSchema, 
})