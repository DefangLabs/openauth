import * as v from 'valibot'

/**
 * The kind of data we expect to get back from identity providers (IdP).
 */
export const providerDataSchema = v.pipe(
    v.objectWithRest(
        {
            // allow string or number as input but always output as string
            id: v.pipe(v.any(), v.string(), v.brand('ProviderID')),
            email: v.pipe(v.string(), v.email(), v.brand('Email')),
            name: v.optional(v.string()),
        },
        v.string(),
    ),
    v.transform((data) => {
        const withName = {
            ...data,
            name: data.name || data.email.split('@')[0],
        };
        return withName as typeof withName & { [key: string]: string };
    }),
)

export type ProviderData = v.InferOutput<typeof providerDataSchema>
