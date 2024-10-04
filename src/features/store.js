import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";
import pagReducer from './slices/paginationSlice';
import favoriteReducer from './slices/favoriteSlice';
import universityReducer from "./slices/universitySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    pagination: pagReducer,
    favorites: favoriteReducer,
    universities: universityReducer,
  },
});