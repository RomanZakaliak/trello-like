import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArgs } from "../store";
import { TNewColumn } from "@/types/new-column.type";

export const getAllColumns = createAsyncThunk<
  any,
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

export const addNewColumn = createAsyncThunk<
  any,
  TNewColumn,
  { extra: ThunkExtraArgs }
>("columns/addNew", async (payload, { extra, rejectWithValue }) => {
  try {
    const newColumn = await extra.columnsService.add(payload);
    return newColumn;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.message);
  }
});
