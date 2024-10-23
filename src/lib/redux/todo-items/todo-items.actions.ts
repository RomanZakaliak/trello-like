import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArgs } from "../store";
import { TNewTodoItem } from "@/types/new-todo-item.type";

export const getAllTodos = createAsyncThunk<
  any,
  void,
  { extra: ThunkExtraArgs }
>("todos/fetchAll", async (_payload, { extra, rejectWithValue }) => {
  try {
    const items = await extra.todoItemsService.getAll();
    return items;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addTodoItem = createAsyncThunk<
  any,
  TNewTodoItem,
  { extra: ThunkExtraArgs }
>("todos/addNew", async (payload, { extra, rejectWithValue }) => {
  try {
    const newTodo = await extra.todoItemsService.add(payload);
    return newTodo;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
