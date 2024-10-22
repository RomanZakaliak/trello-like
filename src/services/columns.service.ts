import IColumn from "@/interfaces/column.interface";
import { IRepository } from "./repos/interfaces/repository.interface";
import { ColumnsRepository } from "./repos/columns.repository";

export class ColumnsService {
  private repository: IRepository<IColumn>;

  constructor(repository: IRepository<IColumn>) {
    this.repository = repository;
  }

  async getAll(): Promise<Array<IColumn>> {
    const items = await this.repository.getAll();
    return items;
  }

  async getById(id: number): Promise<IColumn> {
    const item = await this.repository.getById(id);
    return item;
  }

  async addTodoItem(entity: IColumn): Promise<void> {
    await this.repository.add(entity);
  }

  async addAllTodoItems(entities: Array<IColumn>): Promise<void> {
    await this.repository.addAll(entities);
  }

  async updateTodoItem(entity: IColumn): Promise<void> {
    await this.repository.update(entity);
  }

  async deleteTodoItem(entity: IColumn): Promise<void> {
    await this.repository.delete(entity);
  }
}

export const columnsService = new ColumnsService(
  new ColumnsRepository("TODO_COLUMNS"),
);
