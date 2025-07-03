import { graphql } from "../graphql";
import { hasuraAdminClient } from "../hasura/hasura";
import { upsertAccountUser } from "../users/upsert-account-user";

const listTenantsQuery = graphql(`
  query ListTenants($ownerId: uuid!) {
     tenants(where: { ownerId: { _eq: $ownerId } }, orderBy: { createdAt: ASC }) {
       id
       name
     }
  }
`);

const insertDefaultTenantMutation = graphql(`
  mutation CreateDefaultTenant($name: String!, $ownerId: uuid!) {
     tenant: insertTenantsOne(object: { id: $ownerId, name: $name, ownerId: $ownerId }) {
       id
       name
     }
   }
`);

interface JWTTenant {
  id: string;
  name: string;
}

export interface UpsertUserTenantResult {
  defaultTenant: JWTTenant;
  tenants: JWTTenant[];
}

/**
 * Extract GitHub username from a user's accounts
 */
function extractGithubUsername(
  user: NonNullable<Awaited<ReturnType<typeof upsertAccountUser>>>['user']
): string | undefined {
  return user.usersUserAccounts
    .map(({ userAccountsAccount }) => userAccountsAccount)
    .filter(account => {
      return account.provider === "github" && 
        account.extra?.username !== undefined && 
        typeof account.extra?.username === "string";
    })
    .map(account => account.extra?.username as string)
    .find(username => username !== undefined);
}

/**
 * Extract username from email (part before @)
 */
function extractUsernameFromEmail(email: string | null | undefined): string {
  if (!email) return "";
  const [emailPrefix] = email.split("@");
  return emailPrefix || "";
}

/**
 * Creates and returns a tenant for a user
 */
export async function upsertUserTenant(
  user: NonNullable<Awaited<ReturnType<typeof upsertAccountUser>>>['user']
): Promise<UpsertUserTenantResult> {
  // Check if user already has tenants
  const { data, errors } = await hasuraAdminClient(listTenantsQuery, {
    ownerId: user.id,
  });
  
  if (errors) {
    throw new Error(errors.map(e => e.message).join("; "));
  }

  // Return existing tenants if any
  if (data?.tenants?.length) {
    return {
      defaultTenant: data.tenants[0],
      tenants: data.tenants,
    };
  }

  // Determine username for tenant
  const githubUsername = extractGithubUsername(user);
  const emailUsername = extractUsernameFromEmail(user.email);
  const username = githubUsername || emailUsername || "user";

  // Create tenant name
  const name = `${username}'s Tenant`;

  // Create new tenant
  const { data: insertData, errors: insertErrors } = await hasuraAdminClient(
    insertDefaultTenantMutation,
    { name, ownerId: user.id }
  );

  if (insertErrors) {
    const messages = insertErrors.map((err) => err.message || "Unknown error").join(", ");
    console.error("Error inserting tenant:", messages);
    throw new Error(messages);
  }

  if (!insertData?.tenant) {
    throw new Error("Failed to create tenant.");
  }

  return {
    defaultTenant: insertData.tenant,
    tenants: [insertData.tenant],
  };
}
