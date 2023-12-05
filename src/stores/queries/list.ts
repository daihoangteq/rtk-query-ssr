// Need to use the React-specific entry point to import createApi
import type { IList } from "@/interfaces/list";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
export const listPostAPI = createApi({
  reducerPath: "listPostAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://api.eazy-mock.teqn.asia/mock/ac6096c4-1c9c-4c49-a67a-b3bf4331bb9c/55/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getListPost: builder.query<IList[], string>({
      query: () => "list",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListPostQuery,
  util: { getRunningQueriesThunk },
} = listPostAPI;

// export endpoints for use in SSR
export const { getListPost } = listPostAPI.endpoints;
