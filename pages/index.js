import { useCallback, useEffect } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { setValue as setEditorState } from "../features/editorSlice";
import { useSelector } from "react-redux";
import { useGetNoteQuery, useAddNoteMutation } from "../app/services/editorApi";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link", "image"],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
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
  const uploadImage = useCallback(function uploadImage() {
    const url = prompt("Enter URL");
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertEmbed(cursorPosition, "image", url);
    this.quill.setSelection(cursorPosition + 2);
  }, []);
  return (
    <>
      <section style={{}}>
        <Editor
          value={value}
          theme={"snow"}
          modules={{
            toolbar: {
              container: toolbarOptions,
              handlers: {
                image: uploadImage,
              },
            },
            clipboard: {
              matchVisuals: false,
            },
          }}
          onChange={(newState) => {
            dispatch(setEditorState(newState));
          }}
          style={{ height: "20rem" }}
        />
      </section>
      <button
        style={{
          marginTop: "5rem",
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
