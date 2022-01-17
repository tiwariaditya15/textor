import { debounce, isError } from "lodash";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { setValue as setEditorState } from "../features/editorSlice";
import { useSelector } from "react-redux";
import { useGetNoteQuery, useAddNoteMutation } from "../app/services/editorApi";

const Editor = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Home() {
  const value = useSelector((state) => state.editor.value);
  const dispatch = useDispatch();
  useGetNoteQuery();
  const [addNote, { isLoading, isSuccess, isError }] = useAddNoteMutation();
  console.log();
  return (
    <>
      <section style={{}}>
        <Editor
          value={value}
          onChange={async (newState) => {
            dispatch(setEditorState(newState));
            // debounce(async(await addNote(newState))(), 800);
          }}
          theme={"snow"}
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
      <p>{isSuccess && "Saved."}</p>
      <p>{isError && "Couldn't save. Try again!"}</p>
    </>
  );
}
