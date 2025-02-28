import assert from 'assert'
import { TypedDocumentString } from '../graphql/graphql'


export const hasuraEndpoint = process.env.HASURA_ENDPOINT
export const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET

export const hasuraGraphqlEndpoint = `${hasuraEndpoint}/v1/graphql`


export async function hasuraAdminClient<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
    assert(hasuraEndpoint, 'HASURA_ENDPOINT env var is required')
    assert(hasuraAdminSecret, 'HASURA_GRAPHQL_ADMIN_SECRET env var is required')

    const response = await fetch(hasuraGraphqlEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/graphql-response+json',
            'x-hasura-admin-secret': hasuraAdminSecret,
        },
        body: JSON.stringify({
            query,
            variables
        })
    })

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }

    const data = await response.json() as {
        data: TResult,
        errors: { message: string }[]
    }

    return data
}
