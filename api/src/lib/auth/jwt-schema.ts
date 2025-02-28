import * as z from 'zod';

export const jwtSchema = z.object({
    exp: z.number(),
    properties: z.object({
        id: z.string(),
        hasura: z.object({
            'x-hasura-allowed-roles': z.array(z.string()),
            'x-hasura-default-role': z.string(),
            'x-hasura-user-id': z.string(),
        }),
    }),
    aud: z.string(),
    iss: z.string(),
    sub: z.string(),
    mode: z.string(),
    type: z.string(),
});