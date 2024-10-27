import { useAppSelector } from '@/lib/redux/hooks';
import { ItemsColumn } from './items-column.component';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { AddColumnForm } from './add-column-form.component';
import { useTranslation } from 'react-i18next';

export const ColumnsContainer = () => {
  const { t } = useTranslation();
  const { data: columnsData } = useAppSelector((state) => state.columns);
  const { data: todoItemsData } = useAppSelector((state) => state.todoItems);

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
