import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "f1c5d22066e18c4f15d72173b32de079";

export const movieSlice = createApi({
  reducerPath: "movieSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${apiKey}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => `/movie/popular?api_key=${apiKey}`,
    }),
    getMoviesByGenre: builder.query({
      query: (params) =>
        `/movie/upcoming?api_key=${apiKey}&with_genres=${params.genre}`,
    }),
    getSearchMovies: builder.query({
      query: (params) =>
        `/search/movie?api_key=${apiKey}&query=${params.searchInput}`,
    }),
    getDisoverMovies: builder.query({
      query: () => `/discover/movie?api_key=${apiKey}`,
    }),
    getNowPlayingMovies: builder.query({
      query: () => `/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`,
    }),
    getMovieDetails: builder.query({
      query: (params) => `/movie/${params.movieId}?api_key=${apiKey}`,
    }),
    getMovieCredits: builder.query({
      query: (params) => `/movie/${params.movieId}/credits?api_key=${apiKey}`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useLazyGetMovieCreditsQuery,
  useLazyGetMoviesByGenreQuery,
  useLazyGetSearchMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetDisoverMoviesQuery,
  useLazyGetMovieDetailsQuery,
} = movieSlice;
