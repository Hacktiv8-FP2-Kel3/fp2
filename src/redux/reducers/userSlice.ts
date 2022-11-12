<<<<<<< Updated upstream
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
=======
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { combineReducers } from 'redux';
import shoppingReducer from '../shopping/shopping-reducer';


>>>>>>> Stashed changes
export interface UserState {
  isLoginPending: boolean;
}
interface UserInput {
  username: string;
  password: string;
}
const initialState: UserState = {
  isLoginPending: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoginPending = initialState.isLoginPending;
      toast.success("Berhasil Logout");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoginPending = true;
    });
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.isLoginPending = false;
      toast.success("Berhasil Login");
    });
    builder.addCase(loginAPI.rejected, (state, action) => {
      state.isLoginPending = false;
    });
  },
});

export const loginAPI = createAsyncThunk("login", async (props: UserInput) => {
  try {
    const res = await axios.post("https://fakestoreapi.com/auth/login", {
      username: props.username,
      password: props.password,
    });

    return res.data;
  } catch (e: any) {
    toast.error(e.response.data);
    throw new Error(e.response.data);
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
