import { configureStore } from "@reduxjs/toolkit";
import { accommodationsApi } from "./apis/accommodationsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

// I MAKE THIS COMMENT TO POST ON REVIEWBOARD
const store = configureStore({
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(accommodationsApi.middleware)
  }
})

setupListeners(store.dispatch);

export {
  useFetchAccommodationsQuery, 
  useAddBookmarkMutation
} from './apis/accommodationsApi'