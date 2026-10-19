import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

// --- Async Thunks for CRUD ---

// 1. Read (Fetch all users)
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// 2. Create (Add new user)
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const response = await axios.post(API_URL, newUser);
  return response.data;
});

// 3. Update (Modify existing user)
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, updatedData }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
});

// 4. Delete (Remove user)
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// --- Slice Definition ---
const usersSliceTwo = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSliceTwo.reducer;