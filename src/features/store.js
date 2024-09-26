import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice"
import pagReducer from './slices/paginationSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    pagination: pagReducer,
  }
});