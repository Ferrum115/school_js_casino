import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CasePage from "./case.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/case/:caseId" element={<CasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

