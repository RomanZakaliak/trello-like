import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkExtraArgs } from "../store";

export const getAllColumns = createAsyncThunk<
  any,
  void,
  { extra: ThunkExtraArgs }
>("columns/fetchAll", async (_payload, { extra }) => {
  const columns = await extra.columnsService.getAll();
  return columns;
});
