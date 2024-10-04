import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import universityReducer from "./slices/universitySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    universities: universityReducer,
  },
});