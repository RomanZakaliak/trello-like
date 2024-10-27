import { ITodoItem } from '@/common/interfaces/todo-item.interface';

export type TNewTodoItem = Omit<ITodoItem, 'id' | 'status'>;
