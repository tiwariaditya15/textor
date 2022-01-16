import { createSlice } from "@reduxjs/toolkit";
import { editorApi } from "../app/services/editorApi";
const editorSlice = createSlice({
  name: "editor",
  initialState: {
    value: "",
  },
  reducers: {
    setValue(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      editorApi.endpoints.getNote.matchFulfilled,
      (state, action) => {
        state.value = action.payload.note;
      }
    );
  },
});

export const { setValue } = editorSlice.actions;
export default editorSlice.reducer;
