import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: [
        {
            "http://localhost:8000/svc/hasura/v1/graphql": {
                headers: {
                    "x-hasura-admin-secret": "password",
                    "x-hasura-role": "user",
                },
            },
        },
    ],
    documents: ['src/**/*.ts'],
    ignoreNoDocuments: true,
    generates: {
        './src/graphql/': {
            preset: 'client',
            config: {
                documentMode: 'string'
            }
        },
        './schema.graphql': {
            plugins: ['schema-ast'],
            config: {
                includeDirectives: true
            }
        }
    }
}

export default config