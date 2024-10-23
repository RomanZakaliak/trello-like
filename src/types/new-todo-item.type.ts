import { ITodoItem } from "../interfaces/todo-item.interface";

export type TNewTodoItem = Omit<ITodoItem, "id" | "status">;
