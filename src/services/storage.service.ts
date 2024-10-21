import IColumn from "../interfaces/IColumn";
import ITodoItem from "../interfaces/ITodoItem";

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
