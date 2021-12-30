import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "../enums/enums";

var currentTabFromLocalStorage =
  localStorage.getItem("currentTab") != null
    ? localStorage.getItem("currentTab")
    : Tab.DASHBOARD;
const tabInitialState: string | null = currentTabFromLocalStorage;

const tabSlice = createSlice({
  name: "tab",
  initialState: tabInitialState,
  reducers: {
    updateTab: (state, { payload }: PayloadAction<string>) => {
      return payload;
    },
  },
});

export const { updateTab: updateTabActionCreator } = tabSlice.actions;
export default tabSlice.reducer;
