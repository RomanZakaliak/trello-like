import { configureStore } from '@reduxjs/toolkit';
import { todoItemSlice } from './todo-items/todo-items.slice';
import { columnsSlice } from './columns/columns.slice';
import {
  ColumnsService,
  columnsService,
} from '@/common/services/columns.service';
import {
  TodoItemsService,
  todoItemsService,
} from '@/common/services/todo-items.service';
import { settingsSlice } from './settings/settings.slice';

export interface ThunkExtraArgs {
  columnsService: ColumnsService;
  todoItemsService: TodoItemsService;
}

export const store = configureStore({
  reducer: {
    todoItems: todoItemSlice.reducer,
    columns: columnsSlice.reducer,
    settings: settingsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          columnsService,
          todoItemsService,
        } as ThunkExtraArgs,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
