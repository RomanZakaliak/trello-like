import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { ItemsColumn } from './items-column.component';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AddColumnForm } from './add-column-form.component';
import { toast } from '@/hooks/use-toast';
import { resetError } from '@/lib/redux/todo-items/todo-items.slice';
import { MdError } from 'react-icons/md';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const widthClass: string = ' w-80 min-w-80';
export const ColumnsContainer = () => {
  const { t } = useTranslation();
  const { data: columnsdata } = useAppSelector((state) => state.columns);
  const { data: todoItemsData, error } = useAppSelector(
    (state) => state.todoItems
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      toast({
        duration: 1000,
        className: 'bg-red-400',
        action: (
          <div className="flex w-full items-center gap-1">
            <MdError className="" size={25} />
            <div>
              <h6 className="font-bold">{t('toastErrorTitle')}</h6>
              <span>{error}</span>
            </div>
          </div>
        ),
      });
      dispatch(resetError());
    }
  }, [error, dispatch]);

  return (
    <div className="flex flex-row gap-10 overflow-x-auto px-4">
      {columnsdata.map((column) => {
        return (
          <ItemsColumn
            key={column.id}
            columnOptions={column}
            widthClass={widthClass}
            todoItems={todoItemsData}
          />
        );
      })}

      <Card className={'h-fit' + widthClass}>
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
