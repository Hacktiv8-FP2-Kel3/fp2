import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart, Item } from "../../api-hooks/item/item.model";

export interface ItemState {
  isLoading: boolean;
  items: Item[];
}
const initialState: ItemState = {
  isLoading: false,
  items: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.isLoading = initialState.isLoading;
      const data = action.payload as Item[];
      state.items = data;
    },
    substractItems: (state, action) => {
      const carts = action.payload as Cart[];
      carts.forEach((cart) => {
        const findArrayIndex = state.items.findIndex(
          (item) => cart.id === item.id
        );
        if (findArrayIndex > -1) {
          state.items[findArrayIndex].stock -= cart.quantity;
        }
      });
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    addItems: (state, action) => {
      const datas = action.payload as Item[];
      datas.forEach((data) => {
        const findArrayIndex = state.items.findIndex(
          (item) => data.id === item.id
        );
        if (findArrayIndex > -1) {
          state.items[findArrayIndex].stock += data.stock;
        }
      });
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    adjustItemStock: (state, action) => {
      const data = action.payload as Item;
      const findArrayIndex = state.items.findIndex(
        (item) => data.id === item.id
      );
      if (findArrayIndex > -1) {
        state.items[findArrayIndex].stock = data.stock;
      }
      localStorage.setItem("items", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const data = action.payload as Item[];
      localStorage.setItem(
        "items",
        JSON.stringify(
          data.map((item) => {
            return {
              ...item,
              stock: 20,
            };
          })
        )
      );
      return {
        ...state,
        isLoading: false,
        items: data.map((item) => {
          return {
            ...item,
            stock: 20,
          };
        }),
      };
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const getProducts = createAsyncThunk("products", async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");

    return res.data;
  } catch (e: any) {
    throw new Error(e);
  }
});

export const { setItems, addItems, substractItems, adjustItemStock } =
  itemSlice.actions;

export default itemSlice.reducer;
