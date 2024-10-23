import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArgs } from "../store";

export const getAllColumns = createAsyncThunk<
  unknown,
  void,
  { extra: ThunkExtraArgs }
>("columns/fetchAll", async (_payload, { extra, rejectWithValue }) => {
  try {
    const columns = await extra.columnsService.getAll();
    return columns;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
