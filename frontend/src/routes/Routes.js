import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Auth from "../components/auth";

export default function Routess() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Auth />}></Route>
        <Route exact path="/login" element={<Auth />}></Route>
        <Route path="*" element={<ProtectedRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
