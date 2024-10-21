import IColumn from "../interfaces/column.interface";
import ITodoItem from "../interfaces/todo-item.interface";
import { IRepository } from "./repos/repository.interface";
//import { IRepository } from "./repos/repository.interface";

// currently leave as is to avoid build error but going to replace with implementation below
export default class LocalStorageService<T extends ITodoItem | IColumn> {
  #storageKey: string;
  constructor(storageKey: string) {
    this.#storageKey = storageKey;
  }

  getItems(): Array<T> | null {
    return JSON.parse(localStorage.getItem(this.#storageKey) ?? "null");
  }

  saveItems(items: Array<T>): void {
    localStorage.setItem(this.#storageKey, JSON.stringify(items));
  }
}

// New implementation goes here, need to make separate service for columns
export class TodoItemsService {
  private repository: IRepository<ITodoItem>;

  constructor(repository: IRepository<ITodoItem>) {
    this.repository = repository;
  }

  async getTodoItems(): Promise<Array<ITodoItem>> {
    const items = await this.repository.getAll();
    return items;
  }

  async getById(id: number): Promise<ITodoItem> {
    const item = await this.repository.getById(id);
    return item;
  }
}
