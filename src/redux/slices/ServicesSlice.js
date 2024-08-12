import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  services: [],
  servicesLoading: false,
  servicesError: null,
};

export const getServices = createAsyncThunk(
  "getServices",
  async (categoryName, thunkApi) => {
    try {
      const response = await api.get(`/items?category=${categoryName}`);
      return response.data.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addServices = createAsyncThunk(
  "addServices",
  async ({ data, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post("/items", data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteServices = createAsyncThunk(
  "deleteServices",
  async ({ id }, thunkApi) => {
    try {
      const response = await api.delete(`/items/${id}`);
      return { data: response.data, id };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editServices = createAsyncThunk(
  "editServices",
  async ({ data, slug, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post(`/items/${slug}`, data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getServices.pending, (state) => {
      state.servicesLoading = true;
    }),
      builder.addCase(getServices.fulfilled, (state, action) => {
        state.servicesLoading = false;
        state.services = action.payload;
      }),
      builder.addCase(getServices.rejected, (state, action) => {
        state.servicesLoading = false;
        state.servicesError = action.payload;
      }),
      // Add Services
      builder.addCase(addServices.pending, (state) => {
        state.servicesLoading = true;
      }),
      builder.addCase(addServices.fulfilled, (state, action) => {
        state.servicesLoading = false;
        state.services = [...state.services, action.payload.data];
        toast.success("Services Stored Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(addServices.rejected, (state, action) => {
        state.servicesLoading = false;
        state.servicesError = action.payload;
      }),
      // Delete Services
      builder.addCase(deleteServices.pending, (state) => {
        state.servicesLoading = true;
      }),
      builder.addCase(deleteServices.fulfilled, (state, action) => {
        state.servicesLoading = false;
        state.services = state.services.filter(
          (item) => item.slug !== action.payload.id
        );
        toast.success("Services Deleted Successfully");
      }),
      builder.addCase(deleteServices.rejected, (state, action) => {
        state.servicesLoading = false;
        state.servicesError = action.payload;
        toast.error(action.payload);
      });
    // Edit Services
    builder.addCase(editServices.pending, (state) => {
      state.servicesLoading = true;
    }),
      builder.addCase(editServices.fulfilled, (state, action) => {
        state.servicesLoading = false;
        state.services = state.services.map((item) => {
          if (item.slug === action.payload.data.slug) {
            return action.payload.data;
          }
          return item;
        });
        toast.success("Services Updated Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(editServices.rejected, (state, action) => {
        state.servicesLoading = false;
        state.servicesError = action.payload;
        toast.error(action.payload);
      });
  },
});
export default servicesSlice.reducer;
