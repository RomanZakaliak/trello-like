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
import { userLoginSchema } from '@/sсhemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { loginUser } from '@/lib/redux/auth/auth.actions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { resetFlags } from '@/lib/redux/auth/auth.slice';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(resetFlags());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    dispatch(loginUser(values)).then(() => {
      console.log('no errors');
      navigate('/');
    });
  };

  return (
    <>
      {error && (
        <div className="my-1 text-center text-lg text-red-600">
          Error: {error.toString()}
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
          <Button type="submit" disabled={loading}>
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};
