import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import CollapseSwitch from "./collapse-switch.component";
import ItemsColumn from "./items-column.component";
import { getAllTodos } from "@/lib/redux/todo-items/todo-items.slice";
import { getAllColumns } from "@/lib/redux/columns/columns.actions";

function Page() {
  const columns = useAppSelector((state) => state.columns);
  const todoItems = useAppSelector((state) => state.todoItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //const columnsService = new LocalStorageService<IColumn>("TODO_COLUMNS");

    dispatch(getAllColumns());
    dispatch(getAllTodos());
    console.log("inState_todos", todoItems);
    console.log("inState_columns", columns);
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
