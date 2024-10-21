import { TItemStatus } from "./types/items-status.type.ts";

export default interface IColumn {
  id: number;
  title: string;
  associatedStatus: TItemStatus;
}
