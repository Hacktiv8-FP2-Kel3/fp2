import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export interface LoginState {
  isLoginPending: boolean;
  isLoginSuccess: boolean;
  errorMessage: string;
}
interface LoginInput {
  username: string;
  password: string;
}
const initialState: LoginState = {
  isLoginPending: false,
  isLoginSuccess: false,
  errorMessage: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoginSuccess = initialState.isLoginSuccess;
      state.isLoginPending = initialState.isLoginPending;
      state.errorMessage = initialState.errorMessage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoginPending = true;
    });
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      const data = action.payload;

      if (data?.response?.status === 401) {
        state.isLoginSuccess = false;
        toast.error(data?.response?.data);
      } else {
        state.isLoginSuccess = true;
        localStorage.setItem("token", data.token);
        toast.success("Berhasil Login");
      }
      state.isLoginPending = false;
    });
    builder.addCase(loginAPI.rejected, (state, action) => {
      state.isLoginPending = false;
      state.isLoginSuccess = false;
      state.errorMessage = "Error";
    });
  },
});

export const loginAPI = createAsyncThunk("login", async (props: LoginInput) => {
  try {
    const res = await axios.post("https://fakestoreapi.com/auth/login", {
      username: props.username,
      password: props.password,
    });
    return res.data;
  } catch (e: any) {
    console.log(e);
    return e;
  }
});

export default loginSlice.reducer;
