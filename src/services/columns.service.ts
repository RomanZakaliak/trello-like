import { IColumn } from '@/common/interfaces/column.interface';
import { IColumnsService } from './interfaces/columns-service.interface';
import { TNewColumn } from '@/common/types/new-column.type';

const initialColumns = [
  {
    id: 0,
    title: 'ToDo',
    associatedStatus: 'todo',
  },
  {
    id: 1,
    title: 'In Progress',
    associatedStatus: 'in_progress',
  },
  {
    id: 2,
    title: 'Done',
    associatedStatus: 'done',
  },
];

export class ColumnsService implements IColumnsService {
  private localStorageKey: string;

  constructor(localStorageKey: string) {
    this.localStorageKey = localStorageKey;

    const items = this.getColumnsFromLocalStorage();
    if (!items?.length) {
      this.addAll(initialColumns).then(() => console.log('executed'));
    }
  }

  add(entity: TNewColumn): Promise<IColumn> {
    return new Promise((resolve) => {
      const items = this.getColumnsFromLocalStorage();
      const newColumn: IColumn = {
        ...entity,
        id: new Date().valueOf(),
        associatedStatus: entity.title.toLowerCase() + new Date().valueOf(),
      };

      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify([...items, newColumn])
      );

      resolve(newColumn);
    });
  }

  addAll(entities: IColumn[]): Promise<void> {
    return new Promise((resolve) => {
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
        reject(new Error('Unable to fetch data'));
      }
    });
  }

  getAll(): Promise<IColumn[]> {
    return new Promise((resolve, reject) => {
      const columns = this.getColumnsFromLocalStorage();

      if (!columns) reject(new Error('Unable to fetch data'));

      resolve(columns);
    });
  }

  update(entity: IColumn): Promise<IColumn> {
    return new Promise((resolve, reject) => {
      const items = this.getColumnsFromLocalStorage();
      if (!items) reject(new Error('Unable to fetch data'));

      const updatedItems = items.map((i) => (i.id !== entity.id ? i : entity));

      localStorage.setItem(this.localStorageKey, JSON.stringify(updatedItems));
      resolve(entity);
    });
  }

  delete(entity: IColumn): Promise<void> {
    return new Promise((resolve, reject) => {
      const items = this.getColumnsFromLocalStorage();

      if (!items) reject(new Error('Unable to fetch data'));

      const newItems = items.filter((i) => i.id !== entity.id);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newItems));
      resolve();
    });
  }

  private getColumnsFromLocalStorage(): Array<IColumn> {
    const items = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    ) as Array<IColumn>;

    return items;
  }
}

export const columnsService = new ColumnsService('TODO_COLUMNS');
