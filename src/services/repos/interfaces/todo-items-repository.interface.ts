import ITodoItem from "@/interfaces/todo-item.interface";
import { IRepository } from "./repository.interface";

export interface ITodoItemsRepository extends IRepository<ITodoItem> {}
