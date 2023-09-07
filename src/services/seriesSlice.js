import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "f1c5d22066e18c4f15d72173b32de079";

export const seriesSlice = createApi({
  reducerPath: "seriesSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${apiKey}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularSeries: builder.query({
      query: () => `/tv/popular?api_key=${apiKey}`,
    }),
  }),
});

export const { useGetPopularSeriesQuery } = seriesSlice;
