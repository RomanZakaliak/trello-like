import { z } from 'zod';

export const addTodoFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'addTodoSchemaErrorTitleMin',
    })
    .max(200, {
      message: 'addTodoShemaErrorTitleMax',
    }),
  description: z.string().max(500, {
    message: 'addTodosSchemaDescriptionMax',
  }),
});
