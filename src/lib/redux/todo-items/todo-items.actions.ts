import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArgs } from "../store";

export const getAllTodos = createAsyncThunk<
  any,
  void,
  { extra: ThunkExtraArgs }
>("todos/fetchAll", async (_payload, { extra }) => {
  const items = await extra.todoItemsService.getAll();
  return items;
});
