import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { addColumnFormSchema } from '@/sсhemas/add-column-form.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '@/common/lib/redux/hooks';
import { addNewColumn } from '@/common/lib/redux/columns/columns.actions';
import { useTranslation } from 'react-i18next';

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
    dispatch(addNewColumn({ ...values }));
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
