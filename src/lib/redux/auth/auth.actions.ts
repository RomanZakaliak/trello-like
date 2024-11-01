import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArgs } from '../store';
import { userLoginSchema, UserRegister } from '@/sсhemas/user.schema';
import { z } from 'zod';
import { isAxiosError } from 'axios';
import { AccessToken } from '@/sсhemas/token.schema';

const handleError = (
  error: unknown,
  rejectWithValue: (value: unknown) => unknown
) => {
  if (isAxiosError(error) && error?.response && error.response?.data.message) {
    return rejectWithValue(error.response.data.message);
  } else {
    const errorMessage: string = (error as Error).message;
    return rejectWithValue(errorMessage);
  }
};

export const registerUser = createAsyncThunk<
  any,
  UserRegister,
  { extra: ThunkExtraArgs }
>('auth/register', async (payload, { extra, rejectWithValue }) => {
  try {
    await extra.apiUserService.register(payload);
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const loginUser = createAsyncThunk<
  any,
  z.infer<typeof userLoginSchema>,
  { extra: ThunkExtraArgs }
>('auth/login', async (payload, { extra, rejectWithValue }) => {
  try {
    const token: AccessToken = await extra.apiUserService.login(payload);
    return token;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const refetchToken = createAsyncThunk<
  any,
  void,
  { extra: ThunkExtraArgs }
>('auth/refresh', async (_payload, { extra, rejectWithValue }) => {
  try {
    const token: AccessToken = await extra.apiUserService.refresh();
    return token;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});

export const logoutUser = createAsyncThunk<
  any,
  void,
  { extra: ThunkExtraArgs }
>('auth/logout', async (_, { extra, rejectWithValue }) => {
  try {
    await extra.apiUserService.logout();
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
});
