import { createSubjects } from "@openauthjs/openauth/subject";
import * as v from "valibot";

export const userPropertiesSchema = v.object({
  id: v.string(),
  hasura: v.object({
    "x-hasura-user-id": v.string(),
    "x-hasura-allowed-roles": v.array(v.string()),
    "x-hasura-default-role": v.string(),
  }),
});

export type UserProperties = v.InferOutput<typeof userPropertiesSchema>;

export const subjects = createSubjects({
  user: userPropertiesSchema,
});
