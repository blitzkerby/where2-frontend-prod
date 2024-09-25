import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer
=======
// import authReducer from "./slices/authSlice";
// import userReducer from "./slices/userSlice";
import pagReducer from './slices/paginationSlice'
import jobReducer from "./slices/jobSlice"

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    job: jobReducer,
    // user: userReducer,
    pagination: pagReducer,
>>>>>>> e39a900 (ft2.1-scholashippage: trying to rebase 4rd time)
  },
});