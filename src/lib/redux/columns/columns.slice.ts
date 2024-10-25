import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewColumn, getAllColumns } from './columns.actions';
import { IColumnsState } from './columns-state.interface';
import { IColumn } from '@/common/interfaces/column.interface';

const initialState: IColumnsState = {
  data: [],
  error: null,
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    resetColumnsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllColumns.fulfilled,
        (state, action: PayloadAction<Array<IColumn>>) => {
          state.data = action.payload;
          return state;
        }
      )
      .addCase(getAllColumns.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(addNewColumn.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addNewColumn.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetColumnsError } = columnsSlice.actions;
