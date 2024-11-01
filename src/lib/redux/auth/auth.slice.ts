import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from './auth-state.interface';
import {
  loginUser,
  logoutUser,
  refetchToken,
  registerUser,
} from './auth.actions';
import { AccessToken } from '@/sсhemas/token.schema';

const initialState: IAuthState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = payload as string;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<AccessToken>) => {
          state.loading = false;
          state.success = true;
          state.userToken = payload.accessToken;
        }
      )
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });

    builder
      .addCase(
        refetchToken.fulfilled,
        (state, { payload }: PayloadAction<AccessToken>) => {
          state.loading = false;
          state.userToken = payload.accessToken;
        }
      )
      .addCase(refetchToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        state.userToken = null;
      });

    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.userInfo = {};
        state.userToken = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        state.userInfo = {};
        state.userToken = null;
      });
  },
});

export const { resetFlags } = authSlice.actions;
