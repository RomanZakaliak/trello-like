import { IColumn } from '../common/interfaces/column.interface';
import { useAppSelector } from '../lib/redux/hooks';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getAbbreviation } from '@/lib/app-utils';
import { TodoItemCell } from './todo-item-cell.component';
import { ITodoItem } from '@/common/interfaces/todo-item.interface';

interface ItemsColumnProps {
  columnOptions: IColumn;
  widthClass: string;
  todoItems: Array<ITodoItem>;
}

export const ItemsColumn: React.FC<ItemsColumnProps> = ({
  columnOptions,
  widthClass,
  todoItems,
}) => {
  const { collapseEmptyColumns } = useAppSelector((state) => state.settings);
  const { data: columns } = useAppSelector((state) => state.columns);

  const items = todoItems.filter(
    (todo) => todo.status == columnOptions.associatedStatus
  );

  const collapse: boolean = collapseEmptyColumns && items.length === 0;

  const columnTitle = collapse
    ? getAbbreviation(columnOptions.title)
    : columnOptions.title;

  return (
    <Card className={!collapse ? widthClass : ''}>
      <CardHeader>
        <CardTitle>{columnTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="no-scrollbar mt-2 h-fit max-h-[70vh] overflow-x-scroll border-2 border-solid p-2">
          {items.map((i) => (
            <TodoItemCell key={i.id} todoItem={i} columns={columns} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
