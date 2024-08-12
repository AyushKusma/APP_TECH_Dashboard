import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  auth: false,
  isLoading: false,
  error: null,
  userToken: null,
};

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      return token;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async ({ body, navigate }, thunkApi) => {
    try {
      const res = await authApi.post("login", {
        email: body.email,
        password: body.password,
      });
      return { data: res.data, navigate };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(checkToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auth = action.payload ? true : false;
      state.error = null;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.isLoading = false;
      state.auth = false;
      state.error = action.payload;
      toast.error(action.payload);
    });
    // Login
    builder.addCase(loginAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auth = true;
      state.error = null;
      localStorage.setItem("token", action.payload.data.token);
      state.userToken = action.payload.data.token;
      toast.success("Successfully logged in");
      action.payload.navigate("/dashboard");
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.auth = false;
      state.error = action.payload.response.data.message;
      toast.error(action.payload.response.data.message);
    });
  },
});

export default authSlice.reducer;
