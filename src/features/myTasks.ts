import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../type";

// Initial State
const todosInitialState: ITask[] = [];

//Slice
const myTasksSlice = createSlice({
  name: "myTasks",
  initialState: todosInitialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<ITask>) => {
      state.push(payload);
    },
    updateTasks: (state, { payload }: PayloadAction<ITask[]>) => {
      return [...payload];
    },
  },
});
export const {
  addTask: addTaskActionCreator,
  updateTasks: updateTasksActionCreator,
} = myTasksSlice.actions;

export default myTasksSlice.reducer;
