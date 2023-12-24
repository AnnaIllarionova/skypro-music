import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://skypro-music-api.skyeng.tech",
});

export const allTracksApi = createApi({
  reducerPath: "allTracksApi",
  baseQuery,

  endpoints: (builder) => ({
    getAllTracks: builder.query({
      query: () => "/catalog/track/all/",
    }),

    getSelections: builder.query({
      query: () => "/catalog/selection/",
    }),
    getSelectionById: builder.query({
      query: ({ id }) => `/catalog/selection/${id}/`,
    }),
  }),
});

export const {
  useGetAllTracksQuery,
  useGetSelectionByIdQuery,
  useGetSelectionsQuery,
} = allTracksApi;

export const token = createApi({
  reducerPath: "token",
  baseQuery,
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: ({ email, password }) => ({
        url: "/user/token/",
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetTokenMutation,
} = token;
