import _ from "lodash";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { setValue as setEditorState } from "../features/editorSlice";
import { useSelector } from "react-redux";
import { useGetNoteQuery, useAddNoteMutation } from "../app/services/editorApi";
import { useEffect } from "react";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const Editor = dynamic(
  () => {
    const Editor = import("react-quill");
    return Editor;
  },
  {
    ssr: false,
  }
);

export default function Home() {
  const value = useSelector((state) => state.editor.value);
  const dispatch = useDispatch();
  useGetNoteQuery();
  const [addNote, { isLoading, isSuccess, isError }] = useAddNoteMutation();
  console.log({ Editor });

  return (
    <>
      <section style={{}}>
        <Editor
          value={value}
          theme={"snow"}
          modules={{
            toolbar: toolbarOptions,
            clipboard: {
              matchVisuals: false,
            },
          }}
          onChange={(newState) => {
            dispatch(setEditorState(newState));
            // _.debounce(async function () {
            //   console.log("debounced");
            //   await addNote(newState);
            // }, 800);
          }}
          style={{ height: "20rem" }}
        />
      </section>
      <button
        style={{
          marginTop: "4rem",
          marginLeft: "0.4rem",
          padding: "1rem 1.5rem",
        }}
        onClick={async () => {
          try {
            await addNote(value);
          } catch (error) {
            console.log({ error });
          }
        }}
      >
        Submit
      </button>
      <p>{isLoading && "Saving..."}</p>
      <p
        style={{
          color: "Green",
          padding: "1rem",
        }}
      >
        {isSuccess && "Saved."}
      </p>
      <p>{isError && "Couldn't save. Try again!"}</p>
    </>
  );
}
