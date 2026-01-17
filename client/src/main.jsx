import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { applyTheme, getInitialTheme } from "./lib/theme";

function Root() {
  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  return (
    <div className="glow-bg min-h-screen">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
