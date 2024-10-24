import { z } from 'zod';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTodoFormSchema } from '../sсhemas/add-todo-form.schema';
import { Textarea } from '../components/ui/textarea';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addTodoItem } from '@/lib/redux/todo-items/todo-items.actions';
import { useTranslation } from 'react-i18next';

interface AddTodoFormProps {
  onFormSubmit(): void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onFormSubmit }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof addTodoFormSchema>>({
    resolver: zodResolver(addTodoFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof addTodoFormSchema>) => {
    dispatch(addTodoItem({ ...values }));
    form.reset();
    onFormSubmit();
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
              <FormLabel>{t('titleName')}</FormLabel>
              <FormMessage />
              <FormControl>
                <Input placeholder={t('todoFormTitlePlaceholder')} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t('desriptionName')}</FormLabel>
              <FormMessage />
              <FormControl>
                <Textarea
                  className="h-12"
                  placeholder={t('todoFormDescriptionPlaceholder')}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">{t('addTodoButton')}</Button>
      </form>
    </Form>
  );
};
