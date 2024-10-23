import { z } from 'zod';

export const addColumnFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title cannot be empty',
    })
    .max(50, {
      message: 'Title should be less than 50 symbols',
    }),
});
