import { ITodoItem } from '@/common/interfaces/todo-item.interface';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from './ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { IColumn } from '@/common/interfaces/column.interface';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateTodoItem } from '@/lib/redux/todo-items/todo-items.actions';
import { useTranslation } from 'react-i18next';

interface ITodoItemCellProps {
  todoItem: ITodoItem;
  columns: Array<IColumn>;
}

export const TodoItemCell: React.FC<ITodoItemCellProps> = ({
  todoItem,
  columns,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSelectChange = (newItemStatus: string) => {
    if (todoItem.status == newItemStatus) return;

    const item = { ...todoItem, status: newItemStatus };
    dispatch(updateTodoItem(item));
    console.log(newItemStatus);
  };

  return (
    <li className="mb-1 flex w-full flex-col items-center rounded-sm border-2 border-solid border-slate-900">
      <h5 className="w-full px-1">{todoItem.title}</h5>
      <p className="w-full bg-slate-400 px-1">{todoItem.description}</p>

      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="my-1 h-10 w-[90%] rounded-md bg-black text-sm text-white">
          <SelectValue placeholder={t('changeStatusValuePlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('statusesSelectLabel')}</SelectLabel>
            {columns.map((c) => (
              <SelectItem key={c.id} value={c.associatedStatus}>
                {c.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </li>
  );
};
