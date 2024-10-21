import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IColumn from "../../../interfaces/column.interface";

const initialState: Array<IColumn> = [];

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (_, action: PayloadAction<Array<IColumn>>) => {
      return action.payload;
    },
    addColumn: (state, action: PayloadAction<IColumn>) => {
      state.push(action.payload);
      //TODO: seems like it would not work, need to move "save to storage logic to redux middleware"
      //columnsService.saveItems(state);
    },
  },
});

export const { setColumns, addColumn } = columnsSlice.actions;
