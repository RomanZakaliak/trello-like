import { ITodoItem } from '@/common/interfaces/todo-item.interface';

export interface ITodoItemsState {
  data: Array<ITodoItem>;
  error: string | null;
  loading: boolean;
}
