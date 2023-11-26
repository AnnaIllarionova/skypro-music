import { configureStore } from "@reduxjs/toolkit";
import trackSlice from "./slices/slices";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    track: trackSlice,
  },
  middleware: [thunk],
});
