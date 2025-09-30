import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

/**
 * Redux store configuration
 * Combines all reducers and configures the store with Redux Toolkit
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});