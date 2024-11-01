import { z } from 'zod';

const userBaseRegisterSchema = z.object({
  name: z.string().min(3, {
    message: 'Name should contain at least 3 characters',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({ message: 'Email format is invalid' }),
  password: z
    .string()
    .min(8, {
      message: 'Password should contain at least 8 symbols',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'Password should contain at upper- and lower-case letters, digits and at least one special symbol(@$!%*?&)',
      }
    ),
});

export const userRegisterSchema = userBaseRegisterSchema
  .extend({
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords does not match',
    path: ['confirmPassword'],
  });

export type UserRegister = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = userBaseRegisterSchema.omit({ name: true });

export const fullUserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().nullish(),
});
