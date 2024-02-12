import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export let AllLinkList = () => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/get-all-content")
      .then((response) => response.json())
      .then((data) => setNewData(data))
      .catch((error) => console.error("Failed to fetch content:", error));
  }, []);

  let getLinkFormat = () => {
    if (newData.length > 0) {
      return newData.map(({ path, content }, index) => (
        <li>
          <Link to={`/${path}`} key={index}>
            {path}
          </Link>
        </li>
      ));
    } else {
      return <p>Loading...</p>;
    }
  };

  return <div>{getLinkFormat()}</div>;
};
