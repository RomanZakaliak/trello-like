import { IColumn } from "@/interfaces/column.interface";

export type TNewColumn = Omit<IColumn, "id" | "associatedStatus">;
