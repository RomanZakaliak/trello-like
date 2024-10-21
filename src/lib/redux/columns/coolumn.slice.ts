import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IColumn from "../../../interfaces/column.interface";
import LocalStorageService from "../../../services/todo-items.service";

const columnsService = new LocalStorageService<IColumn>("TODO_COLUMNS");
const initialState: Array<IColumn> = columnsService.getItems() ?? [
  {
    id: 0,
    title: "ToDo",
    associatedStatus: "todo",
  },
  {
    id: 1,
    title: "In Progress",
    associatedStatus: "in_progress",
  },
  {
    id: 2,
    title: "Done",
    associatedStatus: "done",
  },
];

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<IColumn>) => {
      state.push(action.payload);
      //TODO: seems like it would not work, need to move "save to storage logic to redux middleware"
      columnsService.saveItems(state);
    },
  },
});
