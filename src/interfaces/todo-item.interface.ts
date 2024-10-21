import { TItemStatus } from "./types/items-status.type.ts";

export default interface ITodoItem {
  id: number;
  title: string;
  description: string;
  status: TItemStatus;
}
