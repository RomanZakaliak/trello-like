import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { apiUserService } from '@/services/user/api-user.service';
import { userLoginSchema } from '@/sсhemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    try {
      console.log('before submit');
      const response = await apiUserService.login(values);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error instanceof Error);
      setError((error as Error).message);
    }
  };

  return (
    <>
      {error && (
        <div className="my-1 text-center text-lg text-red-600">
          Error: {error}
        </div>
      )}
      <Form {...form}>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} autoComplete="false" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </>
  );
};
