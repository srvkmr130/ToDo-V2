import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDecodedObject } from "../type";

// Initial State
var initialAuthState: { data: IDecodedObject; isLoggedIn: boolean } = {
  data: {
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    name: "",
    picture: "",
    sub: "",
  },
  isLoggedIn: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    initalizeUser: (
      state,
      { payload }: PayloadAction<{ data: IDecodedObject; isLoggedIn: boolean }>
    ) => {
      return { data: { ...payload.data }, isLoggedIn: true };
    },
    removeUser: (
      state,
      { payload }: PayloadAction<{ data: IDecodedObject; isLoggedIn: boolean }>
    ) => {
      return { data: { ...payload.data }, isLoggedIn: false };
    },
  },
});

export const {
  initalizeUser: initalizeUserActionCreator,
  removeUser: removeUserActionCreator,
} = authSlice.actions;

export default authSlice.reducer;
