import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from './apiService';

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const response = await apiService.post("/login", credentials);
  return response.data;
});


const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
    })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
