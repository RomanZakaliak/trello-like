import { z } from 'zod';

const environmentSchema = z.object({
  apiBaseUrl: z.string().url(),
});

const validate = () => {
  const { data, success, error } = environmentSchema.safeParse({
    apiBaseUrl: import.meta.env.VITE_BACKEND_API_URL,
  });

  if (!success) {
    console.error(error);
    throw new Error('Incorrect .env setup');
  }

  return data;
};

export const environment = validate();
