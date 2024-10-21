import IColumn from "../interfaces/column.interface";
import { useAppSelector } from "../lib/redux/hooks";

interface ItemsColumnProps {
  columnOptions: IColumn;
}

const ItemsColumn: React.FC<ItemsColumnProps> = ({ columnOptions }) => {
  const items = useAppSelector((state) => state.todoItems);
  return (
    <section>
      <div className="rounded-lg border-2 border-solid border-cyan-600 p-2 shadow-slate-500">
        <h3 className="text-center">{columnOptions.title}</h3>
      </div>
      <ul className="mt-2 border-2 border-solid p-2">
        {items.map((i) => (
          <li key={i.id}>
            <h5>{i.title}</h5>
            <p>{i.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemsColumn;
