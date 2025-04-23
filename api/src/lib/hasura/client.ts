import assert from 'assert'
import { TypedDocumentString } from '../../graphql/graphql'


export const hasuraEndpoint = process.env.HASURA_ENDPOINT
export const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET

export const hasuraGraphqlEndpoint = `${hasuraEndpoint}/v1/graphql`


export function getHasuraClient(options?: { token?: string }) {
    return {
        fetch: async function<TResult, TVariables>(
            query: TypedDocumentString<TResult, TVariables>,
            ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
        ) {
            assert(hasuraEndpoint, 'HASURA_ENDPOINT env var is required');
    
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                Accept: 'application/graphql-response+json',
            };
    
            if (options?.token) {
                headers['Authorization'] = `Bearer ${options.token}`;
            } else {
                assert(hasuraAdminSecret, 'HASURA_GRAPHQL_ADMIN_SECRET env var is required');
                headers['x-hasura-admin-secret'] = hasuraAdminSecret;
            }
    
            const response = await fetch(hasuraGraphqlEndpoint, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query,
                    variables,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json() as {
                data: TResult,
                errors: { message: string }[]
            };
    
            return data;
        }
    }
}
