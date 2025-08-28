import { graphql } from "@/generated/graphql";

export const createTenantMutation = graphql(`
  mutation CreateTenant($name: String!) {
    tenant: insertTenantsOne(object: { name: $name }) {
      id
      name
    }
  }
`);
