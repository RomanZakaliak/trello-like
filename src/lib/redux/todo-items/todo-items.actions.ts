import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArgs } from '../store';
import { TNewTodoItem } from '@/common/types/new-todo-item.type';
import { ITodoItem } from '@/common/interfaces/todo-item.interface';

export const getAllTodo = createAsyncThunk<
  any,
  void,
  { extra: ThunkExtraArgs }
>('todo/fetchAll', async (_payload, { extra, rejectWithValue }) => {
  try {
    const items = await extra.todoItemsService.getAll();
    return items;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.message);
  }
});

export const addTodoItem = createAsyncThunk<
  any,
  TNewTodoItem,
  { extra: ThunkExtraArgs }
>('todo/addNew', async (payload, { extra, rejectWithValue }) => {
  try {
    const newTodo = await extra.todoItemsService.add(payload);
    return newTodo;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateTodoItem = createAsyncThunk<
  any,
  ITodoItem,
  { extra: ThunkExtraArgs }
>('todo/updateTodo', async (payload, { extra, rejectWithValue }) => {
  try {
    console.log('called update');
    const updatedTodo = await extra.todoItemsService.update(payload);
    return updatedTodo;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.message);
  }
});
