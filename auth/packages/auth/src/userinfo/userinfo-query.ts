import { graphql } from "../graphql";

export const UserinfoQuery = graphql(`
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
`);