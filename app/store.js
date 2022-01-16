import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import editorReducer from "../features/editorSlice";
import { editorApi } from "./services/editorApi";
export const store = configureStore({
  reducer: {
    editor: editorReducer,
    [editorApi.reducerPath]: editorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(editorApi.middleware),
});
