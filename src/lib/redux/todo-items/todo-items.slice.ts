import { createSlice } from '@reduxjs/toolkit';
import { addTodoItem, getAllTodos, updateTodoItem } from './todo-items.actions';
import { ITodoItemsState } from './todo-items-state.interface';

const initialState: ITodoItemsState = {
  data: [],
  error: null,
  loading: false,
};

export const todoItemSlice = createSlice({
  name: 'TodoItem',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, { payload }) => {
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
      });
  },
});

export { getAllTodos };
export const { resetError } = todoItemSlice.actions;
