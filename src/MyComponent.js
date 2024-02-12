import React from "react";
import parse from "html-react-parser";

export function MyComponent({ myHtmlContent }) {
  return <div>{parse(myHtmlContent)}</div>;
}
