import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://skypro-music-api.skyeng.tech",
  prepareHeaders: (headers) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const refreshSpoiltToken = JSON.parse(localStorage.getItem("refreshToken"));

export const allTracksApi = createApi({
  reducerPath: "allTracksApi",
  baseQuery,

  endpoints: (builder) => ({
    getAllTracks: builder.query({
      query: () => "/catalog/track/all/",
    }),

    addTrackInMyPlaylist: builder.mutation({
      query: ({ body, id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "POST",

        body,
      }),
    }),
    removeTrackFromMyPlaylist: builder.mutation({
      query: ({ body, id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "DELETE",
        body,
      }),
    }),
    getMyTracks: builder.query({
      query: () => ({
        url: "/catalog/track/favorite/all/",
        prepareHeaders: (headers) => {
          const accessToken = JSON.parse(localStorage.getItem("accessToken"));
          if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
          }
          return headers;
        },
      }),
    }),
  }),
});

export const {
  useGetAllTracksQuery,
  useAddTrackInMyPlaylistMutation,
  useRemoveTrackFromMyPlaylistMutation,
  useGetMyTracksQuery,
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
    refreshToken: builder.mutation({
      query: () => ({
        url: "/user/token/refresh/",
        method: "POST",
        body: JSON.stringify({
          refresh: refreshSpoiltToken,
        }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetTokenMutation, useRefreshTokenMutation } = token;
