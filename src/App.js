import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WysiwygEditor from "./WysiwygEditor";
import { AllLinkList } from "./AllLinkList";
import { NotFound } from "./NotFound";
import { MyComponent } from "./MyComponent";

function App() {
  const [newData, setNewData] = useState([]);

  const getAllDataFromServer = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-all-content");
      const data = await response.json();
      setNewData(data);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  useEffect(() => {
    getAllDataFromServer();
  }, []);

  return (
    <BrowserRouter>
      <div className="content">
        <nav>
          <ul className="menu">
            <li>
              <Link to="/listAllLink">All Links</Link>
            </li>
            <li>
              <Link to="/cms">CMS</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<WysiwygEditor />} />
          <Route
            path="/cms"
            element={
              <WysiwygEditor getAllDataFromServer={getAllDataFromServer} />
            }
          />
          <Route path="/listAllLink" element={<AllLinkList />} />
          {newData.map(({ path, content }) => (
            <Route
              key={path} 
              path={path}
              element={<MyComponent myHtmlContent={content} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
