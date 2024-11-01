import { z } from 'zod';

export const accessTokenSchema = z.object({
  accessToken: z.string().min(1),
});

export type AccessToken = z.infer<typeof accessTokenSchema>;
