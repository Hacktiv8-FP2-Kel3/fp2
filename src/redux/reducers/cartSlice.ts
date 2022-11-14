import { createSlice } from "@reduxjs/toolkit";
import { Cart, Item } from "../../api-hooks/item/item.model";

export interface CartState {
  carts: Cart[];
}
const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action) => {
      const data = action.payload;
      state.carts = data;
    },
    addCarts: (state, action) => {
      const data = action.payload as Item;
      const findIndex = state.carts.findIndex((item) => item.id === data.id);
      const { stock, ...rest } = data;
      if (findIndex > -1) {
        state.carts[findIndex].quantity++;
      } else {
        state.carts.push({
          ...rest,
          quantity: 1,
        });
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeCarts: (state, action) => {
      const data = action.payload as Cart;
      state.carts = state.carts.filter((cart) => cart.id !== data.id);
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeAllCarts: (state) => {
      state.carts = initialState.carts;
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    adjQtyCarts: (state, action) => {
      const data = action.payload;
      const findIndex = state.carts.findIndex((item) => item.id === data.id);
      const { stock, ...rest } = data;
      if (findIndex > -1) {
        state.carts[findIndex].quantity += data.quantity;
      } else {
        state.carts.push({
          ...rest,
          quantity: data.quantity,
        });
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
  },
  extraReducers: {},
});

export const { setCarts, addCarts, removeCarts, adjQtyCarts, removeAllCarts } =
  cartSlice.actions;

export default cartSlice.reducer;
