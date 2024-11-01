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
import { UserRegister, userRegisterSchema } from '@/sсhemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { registerUser } from '@/lib/redux/auth/auth.actions';
import { useEffect } from 'react';
import { resetFlags } from '@/lib/redux/auth/auth.slice';
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { error, loading, success } = useAppSelector((state) => state.auth);

  const onSubmit = async (values: UserRegister) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    return () => {
      dispatch(resetFlags());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (success) {
    return (
      <>
        <h2>Registration successful</h2>
        <p>
          Now you can <Link to={'/login'}>Login</Link>
        </p>
      </>
    );
  }

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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} autoComplete="false" />
                </FormControl>
              </FormItem>
            )}
          />
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
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};
