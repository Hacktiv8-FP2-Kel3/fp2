import { createSlice } from "@reduxjs/toolkit";
import { Cart, Item } from "../../api-hooks/item/item.model";
import { SoldItem } from "../../api-hooks/sold-item/sold-item.model";

export interface SaleState {
  soldItem: SoldItem[];
}
const initialState: SaleState = {
  soldItem: [],
};

const cartSlice = createSlice({
  name: "soldItem",
  initialState,
  reducers: {
    setSoldItem: (state, action) => {
      const data = action.payload;
      state.soldItem = data;
    },
    adjustSoldItem: (state, action) => {
      const items = action.payload as Cart[];
      items.forEach((item) => {
        const findArrayIndex = state.soldItem.findIndex(
          (sold) => sold.id === item.id
        );
        const { quantity, ...rest } = item;
        if (findArrayIndex > -1) {
          state.soldItem[findArrayIndex].soldQuantity += quantity;
        } else {
          state.soldItem.push({
            ...rest,
            soldQuantity: quantity,
          });
        }
      });
      localStorage.setItem("soldItem", JSON.stringify(state.soldItem));
    },
  },
  extraReducers: {},
});

export const { setSoldItem, adjustSoldItem } = cartSlice.actions;

export default cartSlice.reducer;
