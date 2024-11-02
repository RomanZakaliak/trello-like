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
import { ErrorToastContent } from '@/components/error-toast-content.component';
import { toast } from '@/hooks/use-toast';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetFlags());
    return () => {
      dispatch(resetFlags());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        console.log('then');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toast({
          duration: 2000,
          className: 'bg-red-400',
          action: <ErrorToastContent errorMessage={error} />,
        });
      });
  };

  return (
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
  );
};
