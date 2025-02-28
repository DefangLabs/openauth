import * as z from 'zod';

const accountSchema = z.object({
  account: z.object({
    id: z.string(),
    provider: z.string(),
    providerId: z.string(),
    name: z.string().optional(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const userinfoSchema = z.object({
  userinfo: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    accounts: z.array(accountSchema),
  }),
});

export type UserinfoResponse = z.infer<typeof userinfoSchema>;