import { configureStore } from "@reduxjs/toolkit";
import trackSlice from "./slices/slices";
import { allTracksApi, myTracksApi, token } from "../services/api-services";

export const store = configureStore({
  reducer: {
    track: trackSlice,
    [allTracksApi.reducerPath]: allTracksApi.reducer,
    [token.reducerPath]: token.reducer,
    [myTracksApi.reducerPath]: myTracksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(allTracksApi.middleware)
      .concat(token.middleware)
      .concat(myTracksApi.middleware),
});
