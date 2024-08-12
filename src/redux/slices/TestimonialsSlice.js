import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  testimonials: [],
  testimonialsLoading: false,
  testimonialsError: null,
};

export const getTestimonials = createAsyncThunk(
  "getTestimonials",
  async (_, thunkApi) => {
    try {
      const response = await api.get("/testimonials");
      return response.data.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addTestimonials = createAsyncThunk(
  "addTestimonials",
  async ({ data, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post("/testimonials", data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteTestimonials = createAsyncThunk(
  "deleteTestimonials",
  async ({ id }, thunkApi) => {
    try {
      const response = await api.delete(`/testimonials/${id}`);
      return { data: response.data, id };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editTestimonials = createAsyncThunk(
  "editTestimonials",
  async ({ data, id, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post(`/testimonials/${id}`, data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTestimonials.pending, (state) => {
      state.testimonialsLoading = true;
    }),
      builder.addCase(getTestimonials.fulfilled, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonials = action.payload;
      }),
      builder.addCase(getTestimonials.rejected, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonialsError = action.payload;
      }),
      // Add Testimonials
      builder.addCase(addTestimonials.pending, (state) => {
        state.testimonialsLoading = true;
      }),
      builder.addCase(addTestimonials.fulfilled, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonials = [...state.testimonials, action.payload.data];
        toast.success("Testimonials Stored Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(addTestimonials.rejected, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonialsError = action.payload;
      }),
      // Delete Testimonials
      builder.addCase(deleteTestimonials.pending, (state) => {
        state.testimonialsLoading = true;
      }),
      builder.addCase(deleteTestimonials.fulfilled, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonials = state.testimonials.filter(
          (item) => item.id !== action.payload.id
        );
        toast.success("Testimonials Deleted Successfully");
      }),
      builder.addCase(deleteTestimonials.rejected, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonialsError = action.payload;
        toast.error(action.payload);
      });
    // Edit Testimonials
    builder.addCase(editTestimonials.pending, (state) => {
      state.testimonialsLoading = true;
    }),
      builder.addCase(editTestimonials.fulfilled, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonials = state.testimonials.map((item) => {
          if (item.id === action.payload.data.id) {
            return action.payload.data;
          }
          return item;
        });
        toast.success("Testimonials Updated Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(editTestimonials.rejected, (state, action) => {
        state.testimonialsLoading = false;
        state.testimonialsError = action.payload;
        toast.error(action.payload);
      });
  },
});
export default testimonialsSlice.reducer;
