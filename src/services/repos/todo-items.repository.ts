import ITodoItem from "@/interfaces/todo-item.interface";
import { IRepository } from "./repository.interface";

export class TodoItemsRespository implements IRepository<ITodoItem> {
  private localStorageKey: string;

  constructor(localStorageKey: string) {
    this.localStorageKey = localStorageKey;
  }

  getById(id: number): Promise<ITodoItem> {
    return new Promise((resolve, reject) => {
      const items = JSON.parse(
        localStorage.getItem(this.localStorageKey) ?? "null",
      ) as Array<ITodoItem>;

      if (items) {
        const item = items.find((i) => i.id === id);
        if (!item) reject(new Error(`Unable to find item with id: {id}`));

        resolve(item!);
      } else {
        reject(new Error("Unable to fetch data"));
      }
    });
  }

  getAll(): Promise<Array<ITodoItem>> {
    return new Promise((resolve, reject) => {
      const items = JSON.parse(
        localStorage.getItem(this.localStorageKey) ?? "null",
      ) as Array<ITodoItem>;

      if (!items) reject(new Error("Unable to fetch data"));

      resolve(items);
    });
  }

  add(entity: ITodoItem): Promise<void> {
    return new Promise((resolve, _) => {
      const items = JSON.parse(
        localStorage.getItem(this.localStorageKey) ?? "null",
      ) as Array<ITodoItem>;

      const newItems = [...items, entity];

      localStorage.setItem(this.localStorageKey, JSON.stringify(newItems));

      resolve();
    });
  }

  addAll(entities: ITodoItem[]): Promise<void> {
    return new Promise((resolve, _) => {
      localStorage.setItem(this.localStorageKey, JSON.stringify(entities));
      resolve();
    });
  }

  delete(entity: ITodoItem): Promise<void> {
    return new Promise((resolve, reject) => {
      const items = JSON.parse(
        localStorage.getItem(this.localStorageKey) ?? "null",
      ) as Array<ITodoItem>;

      if (!items) reject(new Error("Unable to fetch data"));

      const newItems = items.filter((i) => i.id !== entity.id);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newItems));
      resolve();
    });
  }
}
