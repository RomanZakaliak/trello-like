import { TNewTodoItem } from '@/common/types/new-todo-item.type';
import { ITodoItem } from '../../common/interfaces/todo-item.interface';
import { ITodoItemsService } from './interfaces/todo-items-service.interface';

export class TodoItemsService implements ITodoItemsService {
  private localStorageKey: string;

  constructor(localStorageKey: string) {
    this.localStorageKey = localStorageKey;
  }

  add(entity: TNewTodoItem): Promise<ITodoItem> {
    return new Promise((resolve) => {
      const items = this.getItemsFromLocalStorage();
      const newItem = {
        ...entity,
        id: new Date().valueOf(),
        status: 'todo',
      } as ITodoItem;

      const newItems = [...items, newItem];

      localStorage.setItem(this.localStorageKey, JSON.stringify(newItems));

      resolve(newItem);
    });
  }

  addAll(entities: ITodoItem[]): Promise<void> {
    return new Promise((resolve) => {
      localStorage.setItem(this.localStorageKey, JSON.stringify(entities));
      resolve();
    });
  }

  getById(id: number): Promise<ITodoItem> {
    return new Promise((resolve, reject) => {
      const items = this.getItemsFromLocalStorage();

      if (items) {
        const item = items.find((i) => i.id === id);
        if (!item) reject(new Error(`Unable to find item with id: {id}`));

        resolve(item!);
      } else {
        reject(new Error('Unable to fetch data'));
      }
    });
  }

  getAll(): Promise<Array<ITodoItem>> {
    return new Promise((resolve) => {
      const items = this.getItemsFromLocalStorage();

      resolve(items);
    });
  }

  update(entity: ITodoItem): Promise<ITodoItem> {
    return new Promise((resolve, reject) => {
      const items = this.getItemsFromLocalStorage();
      if (!items?.length) reject(new Error('Unable to fetch data'));

      const updatedItems = items.map((i) => (i.id !== entity.id ? i : entity));

      localStorage.setItem(this.localStorageKey, JSON.stringify(updatedItems));
      resolve(entity);
    });
  }

  delete(entity: ITodoItem): Promise<void> {
    return new Promise((resolve, reject) => {
      const items = this.getItemsFromLocalStorage();

      if (!items?.length) reject(new Error('Unable to fetch data'));

      const newItems = items.filter((i) => i.id !== entity.id);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newItems));
      resolve();
    });
  }

  private getItemsFromLocalStorage(): Array<ITodoItem> {
    const items = JSON.parse(
      localStorage.getItem(this.localStorageKey) ?? '[]'
    ) as Array<ITodoItem>;

    return items;
  }
}

export const todoItemsService = new TodoItemsService('TODO_ITEMS');
