import { TItemStatus } from '@/common/types/items-status.type.ts';

export interface IColumn {
  id: number;
  title: string;
  associatedStatus: TItemStatus;
}
