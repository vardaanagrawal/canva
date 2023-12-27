import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Home from "../components/home/Home";
import Design from "../components/design/Design";

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}>
        <Route exact path="" element={<Home />}></Route>
      </Route>
      <Route path="/design/:id" element={<Design />}></Route>
    </Routes>
  );
}
