import { configureStore } from "@reduxjs/toolkit";
import { todoItemSlice } from "./items/todo-items.slice";
import { columnsSlice } from "./columns/coolumn.slice";

export const store = configureStore({
  reducer: {
    todoItems: todoItemSlice.reducer,
    columns: columnsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
