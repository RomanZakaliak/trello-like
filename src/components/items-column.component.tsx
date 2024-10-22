import { useEffect } from "react";
import { IColumn } from "../interfaces/column.interface";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { toast } from "@/hooks/use-toast";
import { resetError } from "@/lib/redux/todo-items/todo-items.slice";
import { MdError } from "react-icons/md";

interface ItemsColumnProps {
  columnOptions: IColumn;
}

export const ItemsColumn: React.FC<ItemsColumnProps> = ({ columnOptions }) => {
  const { data, error } = useAppSelector((state) => state.todoItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      toast({
        duration: 1000,
        className: "bg-red-400",
        action: (
          <div className="w-full flex items-center gap-1">
            <MdError className="" size={25} />
            <div>
              <h6 className="font-bold">Oh no error happens</h6>
              <span>{error}</span>
            </div>
          </div>
        ),
      });
      dispatch(resetError());
    }
  }, [error]);

  return (
    <section className="w-1/5">
      <div className="rounded-lg border-2 border-solid border-cyan-600 p-2 shadow-slate-500">
        <h3 className="text-center">{columnOptions.title}</h3>
      </div>
      <ul className="mt-2 border-2 border-solid p-2 h-80 overflow-x-scroll no-scrollbar">
        {data.map((i) => (
          <li
            key={i.id}
            className="mb-1 border-solid rounded-sm border-2 border-slate-900"
          >
            <h5 className="px-1">{i.title}</h5>
            <p className="bg-slate-400 px-1">{i.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
