import { ITodoItem } from '@/common/interfaces/todo-item.interface';
import React, { memo } from 'react';
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
} from '@/components/ui/select';

interface ITodoItemCellProps {
  todoItem: ITodoItem;
  columns?: Array<IColumn>;
}

export const TodoItemCell: React.FC<ITodoItemCellProps> = memo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ todoItem, columns }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const handleSelectChange = (newItemStatus: string) => {
      if (todoItem?.status == newItemStatus) return;

      console.log('do something');
      const item = { ...todoItem, status: newItemStatus };
      dispatch(updateTodoItem(item as ITodoItem));
    };

    const currentColumn = columns?.find(
      (c) => c.associatedStatus === todoItem.status
    );

    return (
      <div className="relative z-10 mb-1 flex w-full flex-col items-center rounded-sm border-2 border-solid border-slate-900 bg-slate-50">
        <h5 className="w-full p-1 text-xl font-semibold">
          {todoItem?.title ?? 'Title'}
        </h5>
        <p className="w-full p-1">{todoItem?.description ?? 'Description'}</p>

        <Select
          onValueChange={handleSelectChange}
          defaultValue={currentColumn?.associatedStatus}
        >
          <SelectTrigger className="my-1 h-10 w-[90%] rounded-md bg-black text-sm text-white">
            {t('changeStatusValuePlaceholder')}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <SelectLabel>{t('statusesSelectLabel')}</SelectLabel>
              {columns
                ? columns.map((c) => (
                    <SelectItem
                      key={c.id}
                      value={c.associatedStatus}
                      onDragStart={() => console.log('dragging start')}
                    >
                      {c.title}
                    </SelectItem>
                  ))
                : null}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
);
