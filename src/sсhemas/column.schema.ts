import { z } from 'zod';

export const addColumnFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'addColumnSchemaTitleErrorMin',
    })
    .max(50, {
      message: 'addColumnsSchemaTitleErrorMax',
    }),
});
