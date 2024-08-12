import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  portfolio: [],
  portfolioLoading: false,
  portfolioError: null,
};

export const getPortfolio = createAsyncThunk(
  "getPortfolio",
  async (categoryName, thunkApi) => {
    try {
      const response = await api.get(`/items?category=${categoryName}`);
      return response.data.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addPortfolio = createAsyncThunk(
  "addPortfolio",
  async ({ data, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post("/items", data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deletePortfolio = createAsyncThunk(
  "deletePortfolio",
  async ({ id }, thunkApi) => {
    try {
      const response = await api.delete(`/items/${id}`);
      return { data: response.data, id };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editPortfolio = createAsyncThunk(
  "editPortfolio",
  async ({ data, slug, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post(`/items/${slug}`, data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPortfolio.pending, (state) => {
      state.portfolioLoading = true;
    }),
      builder.addCase(getPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolio = action.payload;
      }),
      builder.addCase(getPortfolio.rejected, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
      }),
      // Add Portfolio
      builder.addCase(addPortfolio.pending, (state) => {
        state.portfolioLoading = true;
      }),
      builder.addCase(addPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolio = [...state.portfolio, action.payload.data];
        toast.success("Portfolio Stored Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(addPortfolio.rejected, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
      }),
      // Delete Portfolio
      builder.addCase(deletePortfolio.pending, (state) => {
        state.portfolioLoading = true;
      }),
      builder.addCase(deletePortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolio = state.portfolio.filter(
          (item) => item.slug !== action.payload.id
        );
        toast.success("Portfolio Deleted Successfully");
      }),
      builder.addCase(deletePortfolio.rejected, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
        toast.error(action.payload);
      });
    // Edit Portfolio
    builder.addCase(editPortfolio.pending, (state) => {
      state.portfolioLoading = true;
    }),
      builder.addCase(editPortfolio.fulfilled, (state, action) => {
        state.portfolioLoading = false;
        state.portfolio = state.portfolio.map((item) => {
          if (item.slug === action.payload.data.slug) {
            return action.payload.data;
          }
          return item;
        });
        toast.success("Portfolio Updated Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(editPortfolio.rejected, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
        toast.error(action.payload);
      });
  },
});
export default portfolioSlice.reducer;
