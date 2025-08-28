import { graphql } from "../graphql";

export const ExternalTenantsQuery = graphql(`
  query ExternalTenants($ids: [uuid!]!) {
    tenants(where: { id: { _in: $ids } }) {
      id
      name
    }
  }
`)