import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
      toast.success("Add to cart successfull");
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeCarts: (state, action) => {
      const data = action.payload;
      state.carts.filter((item) => item.id === data.id);
      localStorage.setItem("carts", JSON.stringify(state.carts));
      toast.success("Remove to cart successfull");
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
      toast.success("Add to card successfull");
    },
  },
  extraReducers: {},
});

export const { setCarts, addCarts, removeCarts, adjQtyCarts } =
  cartSlice.actions;

export default cartSlice.reducer;
