import { createSlice } from "@reduxjs/toolkit";
import { Cart, Item } from "../../api-hooks/item/item.model";
import { Auth } from "../../api-hooks/user/user.model";

export interface CartState {
  carts: {
    carts: Cart[];
    username: string;
  }[];
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
      const auth: Auth = JSON.parse(localStorage.getItem("auth")!);
      const findUsernameIndex = state?.carts.findIndex(
        (item) => item.username === auth.username
      );
      if (findUsernameIndex > -1) {
        const findIndex = state.carts[findUsernameIndex].carts.findIndex(
          (item) => item.id === data.id
        );
        const { stock, ...rest } = data;
        if (findIndex > -1) {
          state.carts[findUsernameIndex].carts[findIndex].quantity++;
        } else {
          state.carts[findUsernameIndex].carts.push({
            ...rest,
            quantity: 1,
          });
        }
      } else {
        const { stock, ...rest } = data;
        state.carts.push({
          username: auth.username,
          carts: [
            {
              ...rest,
              quantity: 1,
            },
          ],
        });
      }

      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeCarts: (state, action) => {
      const data = action.payload as Cart;
      const auth: Auth = JSON.parse(localStorage.getItem("auth")!);
      const findUsernameIndex = state.carts.findIndex(
        (item) => item.username === auth.username
      );
      state.carts[findUsernameIndex].carts = state.carts[
        findUsernameIndex
      ].carts.filter((cart) => cart.id !== data.id);
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    removeAllCarts: (state) => {
      const auth: Auth = JSON.parse(localStorage.getItem("auth")!);
      const findUsernameIndex = state.carts.findIndex(
        (item) => item.username === auth.username
      );
      state.carts[findUsernameIndex].carts = [];
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    adjQtyCarts: (state, action) => {
      const data = action.payload;
      const auth: Auth = JSON.parse(localStorage.getItem("auth")!);
      const findUsernameIndex = state.carts.findIndex(
        (item) => item.username === auth.username
      );
      if (findUsernameIndex > -1) {
        const findIndex = state.carts[findUsernameIndex].carts.findIndex(
          (item) => item.id === data.id
        );
        const { stock, ...rest } = data;
        if (findIndex > -1) {
          state.carts[findUsernameIndex].carts[findIndex].quantity +=
            data.quantity;
        } else {
          state.carts[findUsernameIndex].carts.push({
            ...rest,
            quantity: data.quantity,
          });
        }
      } else {
        const { stock, ...rest } = data;
        state.carts.push({
          username: auth.username,
          carts: [
            {
              ...rest,
              quantity: data.quantity,
            },
          ],
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
