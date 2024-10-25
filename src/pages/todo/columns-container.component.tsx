import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { ItemsColumn } from './items-column.component';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { AddColumnForm } from './add-column-form.component';
import { toast } from '@/hooks/use-toast';
import { resetTodoError } from '@/lib/redux/todo-items/todo-items.slice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { resetColumnsError } from '@/lib/redux/columns/columns.slice';
import { ErrorToastContent } from '@/components/error-toast-content.component';

export const ColumnsContainer = () => {
  const { t } = useTranslation();
  const { data: columnsData, error: columnsError } = useAppSelector(
    (state) => state.columns
  );
  const { data: todoItemsData, error: todoError } = useAppSelector(
    (state) => state.todoItems
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const error = columnsError || todoError;

    if (error) {
      toast({
        duration: 1000,
        className: 'bg-red-400',
        action: <ErrorToastContent errorMessage={error} />,
      });

      todoError && dispatch(resetTodoError());
      columnsError && dispatch(resetColumnsError());
    }
  }, [columnsError, todoError, dispatch, t]);

  return (
    <div className="flex flex-row gap-10 overflow-x-auto px-4">
      {columnsData.map((column) => {
        return (
          <ItemsColumn
            key={column.id}
            columnOptions={column}
            todoItems={todoItemsData}
          />
        );
      })}

      <Card className={'h-fit w-80 min-w-80'}>
        <CardHeader>
          <CardTitle>{t('columnFormTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <AddColumnForm />
        </CardContent>
      </Card>
    </div>
  );
};
