import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import universityReducer from "./slices/universitySlice";
import jobReducer from "./slices/jobSlice"
import pagReducer from './slices/paginationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    universities: universityReducer,
    job: jobReducer,
    pagination: pagReducer,
  },
});