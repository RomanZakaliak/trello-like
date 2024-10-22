import ITodoItem from "../interfaces/todo-item.interface";
import { IRepository } from "./repos/interfaces/repository.interface";
import { TodoItemsRespository } from "./repos/todo-items.repository";

export class TodoItemsService {
  private repository: IRepository<ITodoItem>;

  constructor(repository: IRepository<ITodoItem>) {
    this.repository = repository;
  }

  async getAll(): Promise<Array<ITodoItem>> {
    const items = await this.repository.getAll();
    return items;
  }

  async getById(id: number): Promise<ITodoItem> {
    const item = await this.repository.getById(id);
    return item;
  }

  async addTodoItem(entity: ITodoItem): Promise<void> {
    await this.repository.add(entity);
  }

  async addAllTodoItems(entities: Array<ITodoItem>): Promise<void> {
    await this.repository.addAll(entities);
  }

  async updateTodoItem(entity: ITodoItem): Promise<void> {
    await this.repository.update(entity);
  }

  async deleteTodoItem(entity: ITodoItem): Promise<void> {
    await this.repository.delete(entity);
  }
}

export const todoItemsService = new TodoItemsService(
  new TodoItemsRespository("TODO_ITEMS"),
);
