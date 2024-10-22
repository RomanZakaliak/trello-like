import { columnsService } from "@/services/columns.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllColumns = createAsyncThunk("columns/fetchAll", async () => {
  const columns = await columnsService.getAll();
  return columns;
});
