import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import usersSliceTwo from '../features/users/usersSliceTwo';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    usersTwo: usersSliceTwo,
  },
});

