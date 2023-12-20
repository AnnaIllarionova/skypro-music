import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://skypro-music-api.skyeng.tech",
});

const baseQueryWithPrepareHeaders = async (args, api, extraOptions) => {
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

  const result = await baseQuery(args, api, extraOptions);
  // console.debug("Результат первого запроса", { result });

  if (result?.error?.status !== 401) {
    return result;
  }

  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  console.debug("Рефреш", refreshToken);
  const forceLogOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };
  if (refreshToken) {
    return forceLogOut();
  }

  const refreshResult = await baseQuery(
    {
      url: "/user/token/refresh/",
      method: "POST",
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    },
    api,
    extraOptions,
  );
  console.debug("Результат запроса на обновление токена", { refreshResult });

  if (!refreshResult.data.access) {
    return forceLogOut();
  }

  localStorage.setItem(
    "accessToken",
    JSON.stringify(refreshResult.data.access),
  );

  const retryResult = await baseQuery(args, api, extraOptions);

  if (retryResult?.error?.status === 401) {
    return forceLogOut();
  }
  console.debug("Повторный запрос завершился успешно");

  return retryResult;
};

// const refreshSpoiltToken = JSON.parse(localStorage.getItem("refreshToken"));

export const myTracksApi = createApi({
  reducerPath: "myTracksApi",
  baseQuery: baseQueryWithPrepareHeaders,
  tagTypes: ["Track"],
  endpoints: (builder) => ({
    addTrackInMyPlaylist: builder.mutation({
      query: ({ body, id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Track"],
    }),
    removeTrackFromMyPlaylist: builder.mutation({
      query: ({ body, id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (arg) => [{ type: "Track", id: arg.id }],
    }),
    getMyTracks: builder.query({
      query: () => "/catalog/track/favorite/all/",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Track", id })), "Track"]
          : ["Track"],
    }),
    getTrackById: builder.query({
      query: ({ id }) => ({ url: `/catalog/track/${id}` }),
      providesTags: ["Track"],
    }),
  }),
});

export const {
  useAddTrackInMyPlaylistMutation,
  useRemoveTrackFromMyPlaylistMutation,
  useGetMyTracksQuery,
  useGetTrackByIdQuery,
} = myTracksApi;

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
    // refreshToken: builder.mutation({
    //   query: () => ({
    //     url: "/user/token/refresh/",
    //     method: "POST",
    //     body: JSON.stringify({
    //       refresh: refreshSpoiltToken,
    //     }),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }),
    // }),
  }),
});

export const {
  useGetTokenMutation,
  // useRefreshTokenMutation
} = token;
