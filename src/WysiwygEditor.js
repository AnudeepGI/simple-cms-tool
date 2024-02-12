import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";

const WysiwygEditor = ({getAllDataFromServer}) => {
  const [text, setText] = useState("");
  const [path, setPath] = useState("");

  const handleChange = (content, delta, source, editor) => {
    setText(editor.getHTML());
  };

  const pathURL = (e) => {
    setPath(e.target.value);
  };

  const submitValue = async () => {
    try {
      const response = await fetch('http://localhost:3000/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path, content: text }),
      });
      if (response.ok) {
        const responseBody = await response.json();
        getAllDataFromServer()
        alert('Save successful:');
      } else {
        console.error('Save failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting value:', error);
    }
  };

  return (
    <>
      <h3>Path:</h3>
      <b><span>/</span></b><input type="text" onChange={pathURL} />
      <br/>
      <h3>Content:</h3>
      <ReactQuill theme="snow" value={text} onChange={handleChange} className="my-custom-quill" />
      <button onClick={submitValue}>Save</button>
    </>
  );
};

export default WysiwygEditor;
