import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ITodoItem from "../../../interfaces/todo-item.interface";
import { getAllTodos } from "./todo-items.actions";

const initialState: Array<ITodoItem> = [];

export const todoItemSlice = createSlice({
  name: "TodoItem",
  initialState,
  reducers: {
    addTodoItem: (state, action: PayloadAction<ITodoItem>) => {
      state.push(action.payload);
      //TODO: seems like it would not work, need to move "save to strage logic to redux middleware"
      //itemsService.saveItems(state);
    },

    updateTodoItem: (state, action: PayloadAction<ITodoItem>) => {
      const item =
        state.find((i) => i.id === action.payload.id) ??
        ({ id: 0 } as ITodoItem);
      state[state.indexOf(item)] = action.payload;
      //TODO: seems like it would not work, need to move "save to strage logic to redux middleware"
      //itemsService.saveItems(state);
    },
    removeTodoItem: (state, action: PayloadAction<number>) => {
      const newState = state.filter((item) => item.id !== action.payload);
      //TODO: seems like it would not work, need to move "save to strage logic to redux middleware"
      //itemsService.saveItems(newState);
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const { addTodoItem, updateTodoItem, removeTodoItem } =
  todoItemSlice.actions;
export { getAllTodos };

