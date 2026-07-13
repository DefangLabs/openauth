import { object, string } from "valibot"
import { createSubjects } from "../packages/openauth/src/subject.js"

export const subjects = createSubjects({
  user: object({
    id: string(),
  }),
})
