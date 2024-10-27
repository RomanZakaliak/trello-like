import { TItemStatus } from '@/common/types/items-status.type.ts';

export interface ITodoItem {
  id: number;
  title: string;
  description: string;
  status: TItemStatus;
}
