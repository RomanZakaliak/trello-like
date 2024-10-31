import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { CollapseSwitch } from './components/collapse-switch.component';
import { getAllColumns } from '@/lib/redux/columns/columns.actions';
import {
  getAllTodo,
  updateTodoItem,
} from '@/lib/redux/todo-items/todo-items.actions';
import { ColumnsContainer } from './components/columns-container.component';
import { Header } from '@/components/header.component';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringConfiguration,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { TodoItemCell } from './components/todo-item-cell.component';
import { ITodoItem } from '@/common/interfaces/todo-item.interface';
import { AddTodoDialog } from './components/add-todo-dialog.component';
import { updateTodoState } from '@/lib/redux/todo-items/todo-items.slice';
import { toast } from '@/hooks/use-toast';
import { ErrorToastContent } from '@/components/error-toast-content.component';

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const TodoPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumns());
    dispatch(getAllTodo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const [activeItem, setActiveItem] = useState<ITodoItem | null>(null);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const overData = over?.data.current;
    const activeData = active.data.current;

    if (over && overData?.associatedStatus !== activeData?.status) {
      const updatedTodo = {
        ...activeData,
        status: overData?.associatedStatus,
      } as ITodoItem;

      // Update state synchronously to make dnd work properly
      dispatch(updateTodoState(updatedTodo));

      // Perform actual async request to update item
      dispatch(updateTodoItem(updatedTodo))
        .unwrap()
        .catch((error) => {
          dispatch(updateTodoState(activeData));

          toast({
            duration: 1000,
            className: 'bg-red-400',
            action: <ErrorToastContent errorMessage={error.message} />,
          });
        });
    }

    setActiveItem(null);
  };

  const handleDragStart = (e: DragStartEvent) => {
    const activeItem = e.active.data.current as ITodoItem;
    setActiveItem(activeItem);
  };

  return (
    <div className="bg-slate-50">
      <Header />
      <div className="flex justify-center gap-3 py-2">
        <AddTodoDialog />
        <CollapseSwitch />
      </div>

      <main className="overflow-hidden">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          sensors={sensors}
          collisionDetection={closestCorners}
          measuring={measuring}
          autoScroll={false}
        >
          <ColumnsContainer />
          <DragOverlay>
            <TodoItemCell todoItem={activeItem!} />
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
};
