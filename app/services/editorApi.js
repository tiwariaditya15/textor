import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const editorApi = createApi({
  reducerPath: "notes",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://textor.tiwariaditya.repl.co/",
  }),
  tagTypes: ["Note"],
  endpoints: (builder) => ({
    getNote: builder.query({
      query: () => "notes",
    }),
  }),
});

export const { useGetNoteQuery } = editorApi;
