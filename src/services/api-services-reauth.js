import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithPrepareHeaders = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech",
    prepareHeaders: (headers) => {
      const accessToken = localStorage
        .getItem("accessToken")
        .replace(/^"|"$/g, "");

      // console.debug("Аксес", accessToken);

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });
  
  const forceLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/signin";
  };

  const result = await baseQuery(args, api, extraOptions);
  // console.debug("Результат первого запроса", { result });

  if (result?.error?.status !== 401) {
    return result;
  }

  const refreshToken = localStorage
    .getItem("refreshToken")
    .replace(/^"|"$/g, "");

  // console.debug("Рефреш", refreshToken);

  if (!refreshToken) {
    return forceLogOut();
  }

  const refreshResult = await baseQuery(
    {
      url: "/user/token/refresh/",
      method: "POST",
      body: {
        refresh: refreshToken,
      },
    },
    api,
    extraOptions,
  );
  // console.debug("Результат запроса на обновление токена", { refreshResult });

  if (!refreshResult.data.access) {
    return forceLogOut();
  }

  localStorage.setItem("accessToken", refreshResult.data.access);

  const retryResult = await baseQuery(args, api, extraOptions);

  if (retryResult?.error?.status === 401) {
    return forceLogOut();
  }
  console.debug("Повторный запрос завершился успешно");

  return retryResult;
};

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
