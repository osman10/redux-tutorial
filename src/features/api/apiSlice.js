import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
        }),
        getVideoById: builder.query({
            query: (videoId) => `/videos/${videoId}`,
        }),
    }),
});

export const { useGetVideosQuery, useGetVideoByIdQuery } = apiSlice;
