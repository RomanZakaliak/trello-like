import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import CollapseSwitch from "./collapse-switch.component";
import ItemsColumn from "./items-column.component";
import IColumn from "@/interfaces/column.interface";
import { setColumns } from "@/lib/redux/columns/coolumn.slice";
import LocalStorageService from "@/services/todo-items.service";
import ITodoItem from "@/interfaces/todo-item.interface";
import { setTodoItems } from "@/lib/redux/items/todo-items.slice";

function Page() {
  const columns = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const columnsService = new LocalStorageService<IColumn>("TODO_COLUMNS");
    const todoItemService = new LocalStorageService<ITodoItem>("TODO_ITEMS");

    const columns = columnsService.getItems() ?? [
      {
        id: 0,
        title: "ToDo",
        associatedStatus: "todo",
      },
      {
        id: 1,
        title: "In Progress",
        associatedStatus: "in_progress",
      },
      {
        id: 2,
        title: "Done",
        associatedStatus: "done",
      },
    ];

    const items = todoItemService.getItems() ?? [
      {
        id: 0,
        title: "an awesome title",
        description: "dummy description",
        status: "todo",
      },
    ];

    dispatch(setColumns(columns));
    dispatch(setTodoItems(items));
  }, []);

  return (
    <>
      <CollapseSwitch />
      <main className="flex flex-row items-center gap-20">
        {columns.map((column) => {
          return <ItemsColumn key={column.id} columnOptions={column} />;
        })}
      </main>
    </>
  );
}

export default Page;
