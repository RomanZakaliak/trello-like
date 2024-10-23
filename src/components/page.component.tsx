import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { CollapseSwitch } from "./collapse-switch.component";
import { ItemsColumn } from "./items-column.component";
import { getAllColumns } from "@/lib/redux/columns/columns.actions";
import { AddTodoForm } from "./add-todo-form.component";
import { getAllTodos } from "@/lib/redux/todo-items/todo-items.actions";

function Page() {
  const { data } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumns());
    dispatch(getAllTodos());
  }, [dispatch]);

  return (
    <>
      <CollapseSwitch />
      <AddTodoForm className={"my-10"} />
      <main className="flex flex-row items-center gap-20">
        {data.map((column) => {
          return <ItemsColumn key={column.id} columnOptions={column} />;
        })}
      </main>
    </>
  );
}

export default Page;
