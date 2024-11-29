import z from 'zod';


/**
 * Logs:
api:dev: @@ decoded:  {
api:dev:   exp: 1726186124,
api:dev:   'https://hasura.io/jwt/claims': {
api:dev:     'x-hasura-allowed-roles': [ 'public' ],
api:dev:     'x-hasura-default-role': 'public',
api:dev:     'x-hasura-user-id': 'anonymous'
api:dev:   },
api:dev:   iat: 1726186064,
api:dev:   iss: 'heimdall',
api:dev:   jti: '9507d23e-4840-4d50-9946-f3c92e0eb0ab',
api:dev:   nbf: 1726186064,
api:dev:   sub: ''
api:dev: }
 */
export const heimdallJwtSchema = z.object({
    exp: z.number(),
    'https://hasura.io/jwt/claims': z.object({
        'x-hasura-allowed-roles': z.array(z.string()),
        'x-hasura-default-role': z.string(),
        'x-hasura-user-id': z.string(),
    }),
    'https://defang.io/jwt/claims': z.object({
        'github-username': z.string(),
        'github-id': z.string(),
        'email': z.string(),
    }).optional(),
    iat: z.number(),
    iss: z.string(),
    jti: z.string(),
    nbf: z.number(),
    sub: z.string(),
});