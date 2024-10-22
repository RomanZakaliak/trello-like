import { ITodoItem } from "../todo-item.interface";

export type TNewTodoItem = Omit<ITodoItem, "id" | "status">;
