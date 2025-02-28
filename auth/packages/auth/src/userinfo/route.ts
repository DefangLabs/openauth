import { Hono } from "hono";
import { authorizeRequest } from "../lib/authorize-request";
import { graphql } from "../graphql";
import { hasuraAdminClient } from "../hasura/hasura";

export const userinfoRouter = new Hono();

const userinfoQuery = graphql(`
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
        }
    }
`)

/**
 * This route returns all the user's data based on the token in the Authorization header.
 */
userinfoRouter.get('/', async (c) => {
    const { claims, error } = await authorizeRequest(c);
    if (error || !claims) {
        return c.json({ error }, 403);
    }

    const id = claims.sub;

    if(!id) {
        return c.json({ error: 'No user id found in claims' }, 403);
    }

    const { data: userInfo, errors: queryErrors } = await hasuraAdminClient(
        userinfoQuery,
        { id }
    )

    if (queryErrors) {
        throw new Error(queryErrors?.[0]?.message);
    }

    return c.json(userInfo);
});