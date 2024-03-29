import { configureStore } from '@reduxjs/toolkit'
import userReduser from './user/userSlice.js';

export const store = configureStore({
  reducer: {
    user : userReduser,
  },
})