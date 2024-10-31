import { Button } from '@/components//ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addColumnFormSchema } from '@/sсhemas/column.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addNewColumn } from '@/lib/redux/columns/columns.actions';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import { ErrorToastContent } from '@/components/error-toast-content.component';

export const AddColumnForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof addColumnFormSchema>>({
    resolver: zodResolver(addColumnFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (values: z.infer<typeof addColumnFormSchema>) => {
    dispatch(addNewColumn({ ...values }))
      .unwrap()
      .catch((error) =>
        toast({
          duration: 1000,
          className: 'bg-red-400',
          action: <ErrorToastContent errorMessage={error.message} />,
        })
      );

    form.reset();
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormMessage />
              <FormControl>
                <Input
                  placeholder={t('columnFormTitlePlaceholder')}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t('addColumnButton')}
        </Button>
      </form>
    </Form>
  );
};
