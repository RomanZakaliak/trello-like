import { z } from 'zod';

export const addTodoFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title cannot be empty',
    })
    .max(200, {
      message: 'Title should be less than 200 symbols',
    }),
  description: z.string().max(500, {
    message: 'Description should be less than 500 symbols',
  }),
});
