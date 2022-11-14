import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import cartReducer, { CartState } from "./reducers/cartSlice";
import itemReducer, { ItemState } from "./reducers/itemSlice";
import saleReducer, { SaleState } from "./reducers/salesSlice";
import userReducer, { UserState } from "./reducers/userSlice";

export interface ListReducers {
  user: UserState;
  item: ItemState;
  cart: CartState;
  sale: SaleState;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    cart: cartReducer,
    sale: saleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
