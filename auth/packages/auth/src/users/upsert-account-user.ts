import { analytics } from "../analytics/analytics";
import { graphql } from "../graphql";
import { Accounts, UpsertAccountMutation, UserAccountsConstraint, UsersConstraint, UsersUpdateColumn } from "../graphql/graphql";
import { hasuraAdminClient } from "../hasura/hasura";
import { createUserId } from "./create-user-id";

const queryUsersForAccount = graphql(`
    query UsersForAccount($accountId: uuid!) {
        users(
            where: { 
                usersUserAccounts: {
                    accountId: { _eq: $accountId }
                }
             }
        ) {
            id
        }
    }    
`);

const upsertAccountUserMutation = graphql(`
    mutation UpsertAccountUser($object: UsersInsertInput!, $onConflict: UsersOnConflict!) {
        user: insertUsersOne(object: $object, onConflict: $onConflict) {
            id
            name
            email
            usersUserAccounts {
                userAccountsAccount {
                    provider
                    extra
                }
            }
        }
    }    
`);

export async function upsertAccountUser(account: Pick<Accounts, 'id' | 'name' | 'email' | 'extra'>) {
    // TODO: Check if user exists with account exists, else create user
    const { data: queryData, errors: queryErrors } = await hasuraAdminClient(queryUsersForAccount, { accountId: account.id });

    if (queryErrors) {
        throw new Error(queryErrors[0].message);
    }

    const { users } = queryData || {};
    const first = users?.[0];
    const userId = first ? first.id : createUserId({
        githubUsername: account.extra.username
    });

    const { data: upsertData, errors: upsertErrors } = await hasuraAdminClient(upsertAccountUserMutation, {
        object: {
            id: userId,
            name: account.name,
            email: account.email,
            usersUserAccounts: {
                data: [
                    {
                        accountId: account.id,
                    }
                ],
                onConflict: {
                    constraint: UserAccountsConstraint.UserAccountsPkey,
                    updateColumns: []
                }
            }
        },
        onConflict: {
            constraint: UsersConstraint.ProfilesPkey,
            updateColumns: [
                UsersUpdateColumn.UpdatedAt
            ]
        }
    });

    if (upsertErrors) {
        throw new Error(upsertErrors[0].message);
    }

    const user = upsertData?.user;
    const tenant = user?.usersUserAccounts.reduce((acc, { userAccountsAccount }) => {
        if (acc) {
            return acc;
        }

        return userAccountsAccount.extra.username;
    }, '' as string | undefined);

    if (!user) {
        throw new Error('Failed to upsert account user');
    }


    analytics.identify({
        userId: user.id,
        traits: {
            email: user.email,
            name: user.name,
            tenant,
            accounts: user.usersUserAccounts.map(({ userAccountsAccount }) => userAccountsAccount.provider)
        }
    });

    return {
        user,
        tenant,
    }
}