import { z } from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTodoFormSchema } from '../sсhemas/add-todo-form.schema';
import { Textarea } from './ui/textarea';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addTodoItem } from '@/lib/redux/todo-items/todo-items.actions';

interface AddTodoFormProps {
  onFormSubmit(): void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onFormSubmit }) => {
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
              <FormLabel>Title</FormLabel>
              <FormMessage />
              <FormControl>
                <Input placeholder="Cook dishes" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormMessage />
              <FormControl>
                <Textarea
                  className="h-12"
                  placeholder="Prepare ingredients and cook dinner"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add ToDo</Button>
      </form>
    </Form>
  );
};
