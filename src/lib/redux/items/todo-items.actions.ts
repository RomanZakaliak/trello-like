import { todoItemsService } from "@/services/todo-items.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTodos = createAsyncThunk("todos/fetchAll", async () => {
  const items = await todoItemsService.getAll();
  return items;
});
