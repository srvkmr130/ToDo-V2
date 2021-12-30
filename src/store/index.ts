import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth";
import myTasksReducer from "../features/myTasks";
import tabReducer from "../features/tab";

const reducer = combineReducers({
  myTasks: myTasksReducer,
  tab: tabReducer,
  auth: authReducer,
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  logger,
];

export default configureStore({
  reducer,
  middleware,
});
