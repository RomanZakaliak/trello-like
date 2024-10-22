import IColumn from "@/interfaces/column.interface";
import { IColumnsRepository } from "./interfaces/columns-repostory.interface";

export class ColumnsRepository implements IColumnsRepository {
  private localStorageKey: string;
  constructor(localStorageKey: string) {
    this.localStorageKey = localStorageKey;
  }

  add(entity: IColumn): Promise<void> {
    return new Promise((resolve, _) => {
      const items = this.getColumnsFromLocalStorage();

      const newItems = [...items, entity];

      localStorage.setItem(this.localStorageKey, JSON.stringify(newItems));

      resolve();
    });
  }

  addAll(entities: IColumn[]): Promise<void> {
    return new Promise((resolve, _) => {
      localStorage.setItem(this.localStorageKey, JSON.stringify(entities));
      resolve();
    });
  }

  getById(id: number): Promise<IColumn> {
    return new Promise((resolve, reject) => {
      const items = this.getColumnsFromLocalStorage();

      if (items) {
        const item = items.find((i) => i.id === id);
        if (!item) reject(new Error(`Unable to find item with id: {id}`));

        resolve(item!);
      } else {
        reject(new Error("Unable to fetch data"));
      }
    });
  }

  getAll(): Promise<IColumn[]> {
    return new Promise((resolve, reject) => {
      //const items = this.getColumnsFromLocalStorage();

      const columns = [
        {
          id: 0,
          title: "ToDo",
          associatedStatus: "todo",
        },
        {
          id: 1,
          title: "In Progress",
          associatedStatus: "in_progress",
        },
        {
          id: 2,
          title: "Done",
          associatedStatus: "done",
        },
      ];

      if (!columns) reject(new Error("Unable to fetch data"));

      resolve(columns);
    });
  }
  update(entity: IColumn): Promise<void> {
    return new Promise((resolve, reject) => {
      const items = this.getColumnsFromLocalStorage();
      if (!items) reject(new Error("Unable to fetch data"));

      const updatedItems = items.map((i) => (i.id !== entity.id ? i : entity));

      localStorage.setItem(this.localStorageKey, JSON.stringify(updatedItems));
      resolve();
    });
  }

  delete(entity: IColumn): Promise<void> {
    return new Promise((resolve, reject) => {
      const items = this.getColumnsFromLocalStorage();

      if (!items) reject(new Error("Unable to fetch data"));

      const newItems = items.filter((i) => i.id !== entity.id);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newItems));
      resolve();
    });
  }

  private getColumnsFromLocalStorage(): Array<IColumn> {
    const items = JSON.parse(
      localStorage.getItem(this.localStorageKey) ?? "null",
    ) as Array<IColumn>;

    return items;
  }
}
