import { graphql } from "@/generated/graphql";

export const tenantsQuery = graphql(`
  query TenantsQuery {
    tenants {
      id
      name
    }
  }
`);
