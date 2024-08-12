import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  teams: [],
  teamsLoading: false,
  teamsError: null,
};

export const getTeams = createAsyncThunk("getTeams", async (_, thunkApi) => {
  try {
    const response = await api.get("/teams");
    return response.data.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const addTeams = createAsyncThunk(
  "addTeams",
  async ({ data, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post("/teams", data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteTeams = createAsyncThunk(
  "deleteTeams",
  async ({ id }, thunkApi) => {
    try {
      const response = await api.delete(`/teams/${id}`);
      return { data: response.data, id };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const editTeams = createAsyncThunk(
  "editTeams",
  async ({ data, id, toggleOpen }, thunkApi) => {
    try {
      const response = await api.post(`/teams/${id}`, data);
      return { data: response.data.data, toggleOpen };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTeams.pending, (state) => {
      state.teamsLoading = true;
    }),
      builder.addCase(getTeams.fulfilled, (state, action) => {
        state.teamsLoading = false;
        state.teams = action.payload;
      }),
      builder.addCase(getTeams.rejected, (state, action) => {
        state.teamsLoading = false;
        state.teamsError = action.payload;
      }),
      // Add Teams
      builder.addCase(addTeams.pending, (state) => {
        state.teamsLoading = true;
      }),
      builder.addCase(addTeams.fulfilled, (state, action) => {
        state.teamsLoading = false;
        state.teams = [...state.teams, action.payload.data];
        toast.success("Teams Stored Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(addTeams.rejected, (state, action) => {
        state.teamsLoading = false;
        state.teamsError = action.payload;
      }),
      // Delete Teams
      builder.addCase(deleteTeams.pending, (state) => {
        state.teamsLoading = true;
      }),
      builder.addCase(deleteTeams.fulfilled, (state, action) => {
        state.teamsLoading = false;
        state.teams = state.teams.filter(
          (item) => item.id !== action.payload.id
        );
        toast.success("Teams Deleted Successfully");
      }),
      builder.addCase(deleteTeams.rejected, (state, action) => {
        state.teamsLoading = false;
        state.teamsError = action.payload;
        toast.error(action.payload);
      });
    // Edit Teams
    builder.addCase(editTeams.pending, (state) => {
      state.teamsLoading = true;
    }),
      builder.addCase(editTeams.fulfilled, (state, action) => {
        state.teamsLoading = false;
        state.teams = state.teams.map((item) => {
          if (item.id === action.payload.data.id) {
            return action.payload.data;
          }
          return item;
        });
        toast.success("Teams Updated Successfully");
        action.payload.toggleOpen();
      }),
      builder.addCase(editTeams.rejected, (state, action) => {
        state.teamsLoading = false;
        state.teamsError = action.payload;
        toast.error(action.payload);
      });
  },
});
export default teamsSlice.reducer;
