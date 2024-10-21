import { TItemStatus } from "./types/TItemStatus";

export default interface ITodoItem {
  id: number;
  title: string;
  description: string;
  status: TItemStatus;
}
