import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home.jsx";
import { UserProvider, useUser } from "./userContext";
import Login from "./login";
import CasePage from "./case.jsx";
import Admin from "./admin.jsx";
import TapCounter from "./tap.jsx";
import "./style.css";
import "./stylefarm.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CasePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/taptap" element={<TapCounter />} />
      </Routes>
  </BrowserRouter>
  </UserProvider>
);