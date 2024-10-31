import { z } from 'zod';

export const userRegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  name: z.string().min(1),
  password: z
    .string({ message: 'Email format is invalid' })
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

export const userLoginSchema = userRegisterSchema.omit({ name: true });

export const fullUserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().nullish(),
});
