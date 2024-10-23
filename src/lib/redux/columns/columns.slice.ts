import { createSlice } from "@reduxjs/toolkit";
import { getAllColumns } from "./columns.actions";
import { IColumnsState } from "./columns-state.interface";

const initialState: IColumnsState = {
  data: [],
  error: null,
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColumns.fulfilled, (state, action) => {
        state.data = action.payload;
        return state;
      })
      .addCase(getAllColumns.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});
