import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FabStack from "./components/FabStack";
import HomeButton from "./components/HomeButton";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
  <App />
  <HomeButton />
  <FabStack />
    </BrowserRouter>
  </React.StrictMode>
);
