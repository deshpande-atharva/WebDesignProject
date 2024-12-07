// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import apiService from './apiService';


// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await fetch('http://localhost:5002/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//       });
      
//       if (!response.ok) {
//         throw new Error('Login failed');
//       }
      
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


// const authSlice = createSlice({
//   name: 'auth',
//   initialState: { user: null, loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload; // Make sure payload contains user details
//         state.loading = false;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.payload || 'Login failed';
//         state.loading = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       });
//   },
// });


// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from './apiService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5002/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
        state.loading = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;