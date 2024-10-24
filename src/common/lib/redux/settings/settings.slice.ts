import { createSlice } from '@reduxjs/toolkit';
import { ISettingState } from './settings-state.interface';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: ISettingState = {
  collapseEmptyColumns: false,
};

export const settingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    updateCollumnsCollapse: (state, action: PayloadAction<boolean>) => {
      state.collapseEmptyColumns = action.payload;
    },
  },
});

export const { updateCollumnsCollapse } = settingsSlice.actions;
