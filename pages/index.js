import { useState } from "react";
import Editor from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Home() {
  const [value, setValue] = useState("");
  console.log({ value });
  return (
    <section style={{}}>
      <Editor
        value={value}
        onChange={setValue}
        theme={"snow"}
        style={{ height: "40rem" }}
      />
    </section>
  );
}
