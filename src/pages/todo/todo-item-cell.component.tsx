import { ITodoItem } from '@/common/interfaces/todo-item.interface';
import React, { forwardRef } from 'react';
import { IColumn } from '@/common/interfaces/column.interface';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateTodoItem } from '@/lib/redux/todo-items/todo-items.actions';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ITodoItemCellProps {
  todoItem?: ITodoItem;
  columns?: Array<IColumn>;
}

export const TodoItemCell: React.FC<ITodoItemCellProps> = forwardRef(
  ({ todoItem, columns }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const handleSelectChange = (newItemStatus: string) => {
      if (todoItem?.status == newItemStatus) return;

      const item = { ...todoItem, status: newItemStatus };
      dispatch(updateTodoItem(item as ITodoItem));
      console.log(newItemStatus);
    };

    return (
      <div className="relative z-10 mb-1 flex w-full flex-col items-center rounded-sm border-2 border-solid border-slate-900">
        <h5 className="w-full p-1 text-xl font-semibold">
          {todoItem?.title ?? 'Title'}
        </h5>
        <p className="w-full p-1">{todoItem?.description ?? 'Description'}</p>

        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="my-1 h-10 w-[90%] rounded-md bg-black text-sm text-white">
            <SelectValue placeholder={t('changeStatusValuePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t('statusesSelectLabel')}</SelectLabel>
              {(columns ?? [])?.map((c) => (
                <SelectItem key={c.id} value={c.associatedStatus}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
);
