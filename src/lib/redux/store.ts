import { configureStore } from '@reduxjs/toolkit';
import { todoItemSlice } from './todo-items/todo-items.slice';
import { columnsSlice } from './columns/columns.slice';
import {
  ColumnsService,
  columnsService,
} from '@/services/columns/columns.service';
import {
  TodoItemsService,
  todoItemsService,
} from '@/services/todo-items/todo-items.service';
import { settingsSlice } from './settings/settings.slice';
import {
  SettingsService,
  settingsService,
} from '@/services/settings/settings-state.service';
import { authSlice } from './auth/auth.slice';
import {
  apiUserService,
  ApiUserService,
} from '@/services/user/api-user.service';

export interface ThunkExtraArgs {
  columnsService: ColumnsService;
  todoItemsService: TodoItemsService;
  settingsService: SettingsService;
  apiUserService: ApiUserService;
}

export const store = configureStore({
  reducer: {
    todoItems: todoItemSlice.reducer,
    columns: columnsSlice.reducer,
    settings: settingsSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          columnsService,
          todoItemsService,
          settingsService,
          apiUserService,
        } as ThunkExtraArgs,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
