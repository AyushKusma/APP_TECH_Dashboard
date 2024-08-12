import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  category: [],
  categoryLoading: false,
  categoryError: null,
};

export const getCategories = createAsyncThunk(
  "getCategories",
  async ({ limit = 10, page = 0 }, thunkApi) => {
    try {
      const response = await api.get("/categories", {
        params: {
          limit,
          page: page + 1,
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postCategory = createAsyncThunk(
  "postCategory",
  async ({ data, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post("/categories", data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error, "ERROR OCCURED");
    }
  }
);

export const editCategory = createAsyncThunk(
  "editCategory",
  async ({ data, toggleOpen }, thunkApi) => {
    try {
      const response = await api.put(`/categories/${data.id}`, data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async ({ id }, thunkApi) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return { id: id, response: response };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.categoryLoading = true;
    }),
      builder.addCase(getCategories.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.category = action.payload.data.data;
      }),
      builder.addCase(getCategories.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload;
      }),
      // Post category
      builder.addCase(postCategory.pending, (state) => {
        state.categoryLoading = true;
      }),
      builder.addCase(postCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.category = [action.payload.data, ...state.category];
        toast.success("Category successfully created");
        action.payload.toggleOpen();
      }),
      builder.addCase(postCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload.response.data.message;
        toast.error(action.payload.response.data.message);
      }),
      // Edit Category
      builder.addCase(editCategory.pending, (state) => {
        state.categoryLoading = true;
      }),
      builder.addCase(editCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.category = state.category.map((category) => {
          if (category.id === action.payload.data.id) {
            return action.payload.data;
          }
          return category;
        });
        toast.success("Category successfully updated");
        action.payload.toggleOpen();
      }),
      builder.addCase(editCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload.response.data.message;
        toast.error(action.payload.response.data.message);
      }),
      // Delete Category
      builder.addCase(deleteCategory.pending, (state) => {
        state.categoryLoading = true;
      }),
      builder.addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.category = state.category.filter(
          (category) => category.id !== action.payload.id
        );
        toast.success(action.payload.response.data.data);
      }),
      builder.addCase(deleteCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload.response.data.message;
        toast.error(action.payload.response.data.message);
      });
  },
});

export default categorySlice.reducer;
