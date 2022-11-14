import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../../api-hooks/item/item.model";

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

export const { setItems } = itemSlice.actions;

export default itemSlice.reducer;
