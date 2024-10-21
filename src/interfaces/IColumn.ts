import { TItemStatus } from "./types/TItemStatus";

export default interface IColumn {
  id: number;
  title: string;
  associatedStatus: TItemStatus;
}
