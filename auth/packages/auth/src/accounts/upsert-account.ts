import { graphql } from "../graphql";
import { AccountsConstraint, AccountsUpdateColumn } from "../graphql/graphql";
import { hasuraAdminClient } from "../hasura/hasura";
import { ProviderData } from "../providers/provider-data-schema";
import { EnabledProviders } from "../providers/providers";
import { createAccountId } from "./create-account-id";


const UpsertAccountMutation = graphql(`
    mutation UpsertAccount($object: AccountsInsertInput!, $onConflict: AccountsOnConflict) {
        account: insertAccountsOne(object: $object, onConflict: $onConflict) {
            id
            name
            email
            extra
        }
    }
`)

export async function upsertAccount(
  providerData: ProviderData,
  provider: EnabledProviders
) {
  const accountId = createAccountId(provider, providerData.id);
  const { id: providerId, email, name, ...extra } = providerData;

  const { data, errors } = await hasuraAdminClient(UpsertAccountMutation, {
    object: {
      id: accountId,
      provider,
      providerId,
      email,
      name,
      extra,
    },
    onConflict: {
      constraint: AccountsConstraint.AccountsPkey,
      updateColumns: [
        AccountsUpdateColumn.Email,
        AccountsUpdateColumn.Name,
        AccountsUpdateColumn.Extra,
      ],
    },
  });

  if (errors) {
    throw new Error(errors[0].message);
  }

  const { account } = data || {};

  if (!account) {
    throw new Error("Failed to upsert account");
  }

  return {
    account,
  };
}
