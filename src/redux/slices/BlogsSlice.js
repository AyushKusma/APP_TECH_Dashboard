import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  blogs: [],
  blogsLoading: false,
  blogsError: null,
};

export const getBlogs = createAsyncThunk(
  "getBlogs",
  async (categoryName, thunkApi) => {
    try {
      const response = await api.get(`/items?category=${categoryName}`);
      return response.data.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addBlogs = createAsyncThunk(
  "addBlogs",
  async ({ data, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post("/items", data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteBlogs = createAsyncThunk(
  "deleteBlogs",
  async ({ id }, thunkApi) => {
    try {
      const response = await api.delete(`/items/${id}`);
      return { data: response.data, id };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editBlogs = createAsyncThunk(
  "editBlogs",
  async ({ data, slug, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post(`/items/${slug}`, data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.blogsLoading = true;
    }),
      builder.addCase(getBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogs = action.payload;
      }),
      builder.addCase(getBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogsError = action.payload;
      }),
      // Add Blogs
      builder.addCase(addBlogs.pending, (state) => {
        state.blogsLoading = true;
      }),
      builder.addCase(addBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogs = [...state.blogs, action.payload.data];
        toast.success("Blogs Stored Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(addBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogsError = action.payload;
      }),
      // Delete Blogs
      builder.addCase(deleteBlogs.pending, (state) => {
        state.blogsLoading = true;
      }),
      builder.addCase(deleteBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogs = state.blogs.filter(
          (item) => item.slug !== action.payload.id
        );
        toast.success("Blogs Deleted Successfully");
      }),
      builder.addCase(deleteBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogsError = action.payload;
        toast.error(action.payload);
      });
    // Edit Blogs
    builder.addCase(editBlogs.pending, (state) => {
      state.blogsLoading = true;
    }),
      builder.addCase(editBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogs = state.blogs.map((item) => {
          if (item.slug === action.payload.data.slug) {
            return action.payload.data;
          }
          return item;
        });
        toast.success("Blogs Updated Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(editBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogsError = action.payload;
        toast.error(action.payload);
      });
  },
});
export default blogsSlice.reducer;
