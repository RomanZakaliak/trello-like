import { IColumn } from '@/common/interfaces/column.interface';
import { useAppSelector } from '@/lib/redux/hooks';
import { useDroppable } from '@dnd-kit/core';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { getAbbreviation } from '@/utils/app-utils';
import { ITodoItem } from '@/common/interfaces/todo-item.interface';
import { cn } from '@/utils/utils';
import { Draggable } from '@/components/draggable.component';
import { TodoItemCell } from './todo-item-cell.component';

interface ItemsColumnProps {
  columnOptions: IColumn;
  todoItems: Array<ITodoItem>;
}

export const ItemsColumn: React.FC<ItemsColumnProps> = ({
  columnOptions,
  todoItems,
}) => {
  const { collapseEmptyColumns } = useAppSelector((state) => state.settings);
  const { data: columns } = useAppSelector((state) => state.columns);

  const { isOver, setNodeRef } = useDroppable({
    id: columnOptions.id,
  });

  const items = todoItems.filter(
    (todo) => todo.status == columnOptions.associatedStatus
  );

  const collapse = collapseEmptyColumns && items.length === 0;

  const columnTitle = collapse
    ? getAbbreviation(columnOptions.title)
    : columnOptions.title;

  return (
    <Card
      className={cn({
        'w-80 min-w-80': !collapse,
        'bg-gray-400': isOver,
      })}
      ref={setNodeRef}
    >
      <CardHeader>
        <CardTitle>{columnTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="no-scrollbar mt-2 h-fit max-h-[70vh] overflow-x-scroll border-2 border-solid p-2">
          {items.map((i) => (
            <Draggable key={i.id} id={i.id}>
              <TodoItemCell todoItem={i} columns={columns} />
            </Draggable>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
