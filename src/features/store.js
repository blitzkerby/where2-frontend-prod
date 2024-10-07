import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import userReducer from "./slices/userSlice";
import scholarReducer from './slices/scholarshipsSlice'
import pagReducer from './slices/paginationSlice'
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // user: userReducer,
    pagination: pagReducer,
    scholarships: scholarReducer,

  },
});