import { useAppSelector } from "../lib/redux/hooks";
import CollapseSwitch from "./collapse-switch.component";
import ItemsColumn from "./items-column.component";

function Page() {
  const columns = useAppSelector((state) => state.columns);
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
