import { configureStore } from "@reduxjs/toolkit";
import  trackSlice  from "./slices/slices";

export const store = configureStore({
  reducer: {
    track: trackSlice,
  },
});
