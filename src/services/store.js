import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./movieSlice";
import { seriesSlice } from "./seriesSlice";

export const store = configureStore({
  reducer: {
    [movieSlice.reducerPath]: movieSlice.reducer,
    [seriesSlice.reducerPath]: seriesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieSlice.middleware)
      .concat(seriesSlice.middleware),
});
