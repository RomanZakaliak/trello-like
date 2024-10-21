import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ITodoItem from "../../../interfaces/ITodoItem";
import LocalStorageService from "../../../services/storage.service";

const itemsService = new LocalStorageService<ITodoItem>("TODO_ITEMS");
const initialState: Array<ITodoItem> = itemsService.getItems() ?? [
  {
    id: 0,
    title: "Learn react",
    description: "Make some effort to learn react",
    status: "in_progress",
  },
  {
    id: 1,
    title: "Make something amazing",
    description: "It just dummy items",
    status: "todo",
  },
];

export const todoItemSlice = createSlice({
  name: "TodoItem",
  initialState,
  reducers: {
    addTodoItem: (state, action: PayloadAction<ITodoItem>) => {
      state.push(action.payload);
      //TODO: seems like it would not work, need to move "save to strage logic to redux middleware"
      itemsService.saveItems(state);
    },
    updateTodoItem: (state, action: PayloadAction<ITodoItem>) => {
      const item =
        state.find((i) => i.id === action.payload.id) ??
        ({ id: 0 } as ITodoItem);
      state[state.indexOf(item)] = action.payload;
      //TODO: seems like it would not work, need to move "save to strage logic to redux middleware"
      itemsService.saveItems(state);
    },
    removeTodoItem: (state, action: PayloadAction<number>) => {
      const newState = state.filter((item) => item.id !== action.payload);
      //TODO: seems like it would not work, need to move "save to strage logic to redux middleware"
      itemsService.saveItems(newState);
      return newState;
    },
  },
});
