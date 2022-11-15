import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../api-hooks/item/item.model";
import { Sales } from "../../api-hooks/sales/sales.model";

export interface SaleState {
  sales: Sales[];
}
const initialState: SaleState = {
  sales: [],
};

const cartSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, action) => {
      const data = action.payload;
      state.sales = data;
    },
    adjustSales: (state, action) => {
      const items = action.payload as Cart[];
      items.forEach((item) => {
        const findArrayIndex = state.sales.findIndex(
          (sold) => sold.id === item.id
        );
        const { quantity, ...rest } = item;
        if (findArrayIndex > -1) {
          state.sales[findArrayIndex].soldQuantity += quantity;
        } else {
          state.sales.push({
            ...rest,
            soldQuantity: quantity,
          });
        }
      });
      localStorage.setItem("sales", JSON.stringify(state.sales));
    },
  },
  extraReducers: {},
});

export const { setSales, adjustSales } = cartSlice.actions;

export default cartSlice.reducer;
