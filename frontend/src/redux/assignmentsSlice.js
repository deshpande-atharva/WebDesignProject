// redux/assignmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from './apiService'; // Axios instance

// Async action to add an assignment
export const addAssignment = createAsyncThunk(
  'assignments/addAssignment',  // Action type string
  async (assignmentData) => {
    const response = await apiService.post('/assignments/create', assignmentData);  // Post request to backend
    return response.data;  // Assuming the response contains the created assignment data
  }
);

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState: {
    assignments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.push(action.payload);  // Add the new assignment to the state
      })
      .addCase(addAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;  // Set error message if request fails
      });
  },
});

export default assignmentsSlice.reducer;
