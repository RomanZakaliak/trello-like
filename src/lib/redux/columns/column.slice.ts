import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IColumn from "../../../interfaces/column.interface";
import { columnsService } from "@/services/columns.service";

const initialState: Array<IColumn> = [];

const getAllColumns = createAsyncThunk("columns/fetchAll", async () => {
  const columns = await columnsService.getAll();
  return columns;
});

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (_, action: PayloadAction<Array<IColumn>>) => {
      return action.payload;
    },
    addColumn: (state, action: PayloadAction<IColumn>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllColumns.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const { setColumns, addColumn } = columnsSlice.actions;
export { getAllColumns };
