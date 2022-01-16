import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const Editor = dynamic(() => import("react-quill"), {
  ssr: false,
});
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
