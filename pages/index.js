import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { setValue as setEditorState } from "../features/editorSlice";
import { useSelector } from "react-redux";
import { useGetNoteQuery } from "../app/services/editorApi";

const Editor = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Home() {
  const value = useSelector((state) => state.editor.value);
  const dispatch = useDispatch();
  useGetNoteQuery();

  return (
    <section style={{}}>
      <Editor
        value={value}
        onChange={(newState) => {
          dispatch(setEditorState(newState));
        }}
        theme={"snow"}
        style={{ height: "40rem" }}
      />
    </section>
  );
}
