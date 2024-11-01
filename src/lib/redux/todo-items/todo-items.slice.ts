import { createSlice } from '@reduxjs/toolkit';
import {
  addTodoItem,
  deleteTodoItem,
  getAllTodo,
  updateTodoItem,
} from './todo-items.actions';
import { ITodoItemsState } from './todo-items-state.interface';
import { ITodoItem } from '@/common/interfaces/todo-item.interface.ts';

const initialState: ITodoItemsState = {
  data: [],
  error: null,
  loading: false,
};

export const todoItemSlice = createSlice({
  name: 'TodoItem',
  initialState,
  reducers: {
    resetTodoError: (state) => {
      state.error = null;
    },
    updateTodoState: (state, { payload }) => {
      state.data = state.data.map((td) =>
        td.id === payload.id ? payload : td
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodo.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getAllTodo.rejected, (state, { payload }) => {
        state.error = payload as string;
      })
      .addCase(addTodoItem.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addTodoItem.rejected, (state, { payload }) => {
        state.error = payload as string;
      })
      .addCase(updateTodoItem.fulfilled, (state, { payload }) => {
        state.data = state.data.map((td) =>
          td.id === payload.id ? payload : td
        );
      })
      .addCase(updateTodoItem.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteTodoItem.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((i: ITodoItem) => i.id !== payload.id);
      });
  },
});

export { getAllTodo };
export const { resetTodoError, updateTodoState } = todoItemSlice.actions;
