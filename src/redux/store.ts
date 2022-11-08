import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import userReducer, { UserState } from "./reducers/userSlice";

export interface ListReducers {
  user: UserState;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
