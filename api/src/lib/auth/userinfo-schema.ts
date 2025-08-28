import * as z from 'zod';

/**
 * Userinfo data is based on this graphql query in:
 * auth/packages/auth/src/userinfo/route.ts
 * 
 * const userinfoQuery = graphql(`
    query UserInfo($id: uuid!) {
        userinfo: usersByPk(
            id: $id
        ) {
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
`)
 */

const accountSchema = z.object({
  account: z.object({
    id: z.string(),
    provider: z.string(),
    providerId: z.string(),
    name: z.string().optional(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

const tenantSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const tenantMembershipSchema = z.object({
  role: z.string(),
  tenant: tenantSchema,
});

export const userinfoSchema = z.object({
  userinfo: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    accounts: z.array(accountSchema),
    ownedTenants: z.array(tenantSchema),
    tenantMemberships: z.array(tenantMembershipSchema),
  }),
});

export type UserinfoResponse = z.infer<typeof userinfoSchema>;