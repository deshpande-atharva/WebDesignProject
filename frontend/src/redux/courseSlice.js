import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from './apiService';

// Async action to fetch courses
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await apiService.get('/courses'); // API endpoint to fetch courses
  return response.data; // Assuming response contains course data
});

const courseSlice = createSlice({
    name: 'courses',
    initialState: {
      courses: [], // Initialize as an empty array
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCourses.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCourses.fulfilled, (state, action) => {
          state.loading = false;
          state.courses = action.payload; // Update courses
        })
        .addCase(fetchCourses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default courseSlice.reducer;