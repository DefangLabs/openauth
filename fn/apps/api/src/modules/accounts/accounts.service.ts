import { Request, Response } from 'express';
import z from 'zod';
import { validateJwt } from '../../lib/auth/validate-jwt';
import { getClient } from '@/lib/defang/get-client';
import { create } from '@bufbuild/protobuf';
import { DeleteRequestSchema, TokenRequestSchema } from '@/lib/defang/generated/fabric_pb';


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
const decodedJwtSchema = z.object({
    exp: z.number(),
    'https://hasura.io/jwt/claims': z.object({
        'x-hasura-allowed-roles': z.array(z.string()),
        'x-hasura-default-role': z.string(),
        'x-hasura-user-id': z.string(),
    }),
    iat: z.number(),
    iss: z.string(),
    jti: z.string(),
    nbf: z.number(),
    sub: z.string(),
});

/**
 * Deletes the user from the Kratos database. (eventually our Auth.js service)
 */
async function deleteAuth({ id }: { id: string }) {
    await fetch(`http://${process.env.KRATOS_DOMAIN?.replace('4433', '4434')}/admin/identities/${id}`, {
        method: 'DELETE',
    });
}

/**
 * Calls the deletion endpoint from Fabric, which will take care of removing the user
 * from services like Segment, Intercom, Mixpanel, etc.
 */
async function deleteFabric({ heimdallToken }: { heimdallToken: string }) {
    let defangClient = getClient();
    const defangTokenRequest = create(TokenRequestSchema, {
        assertion: heimdallToken,
        scope: ['tail', 'read', 'delete'],
    });
    const defangResponse = await defangClient.token(defangTokenRequest);
    const defangToken = defangResponse.accessToken;
    defangClient = getClient(defangToken);
    await defangClient.deleteMe({});
}

/**
 * Deletes the user from the Hasura database.
 */
async function deleteProfile({ id, authorization }: { id: string, authorization: string }) {
    const operation = `
        mutation DeleteProfile($id: uuid!) {
            deleteProfilesByPk(id: $id) {
                id
            }
        }
    `;
    return fetch(`http://${process.env.HASURA_DOMAIN}/v1/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: operation,
            variables: { id },
            operationName: 'DeleteProfile',
        }),
        headers: {
            Authorization: authorization,
        },
    }).then(result => result.json());
}

/**
 * Deletes the user's account, taking care of triggering a variety of deletion
 * operations.
 */
export async function deleteAccount(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = await validateJwt(token);

    const decodedJwt = decodedJwtSchema.safeParse(decoded);

    if (!decodedJwt.success) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    const subject = decodedJwt.data.sub;

    if (!subject) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    

    console.log('@@ deleting from fabric');
    await deleteFabric({ heimdallToken: token });
    console.log('@@ deleting from hasura');
    await deleteProfile({ id: decodedJwt.data.sub, authorization: authHeader });
    console.log('@@ deleting from kratos');
    await deleteAuth({ id: decodedJwt.data.sub });

    res.status(200).send({ message: 'Account deleted.' });
}