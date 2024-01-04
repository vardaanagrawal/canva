import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoutes from "./ProtectedRoutes";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import Verification from "../components/authentication/Verification";
import ForgotPassword from "../components/authentication/ForgotPassword";
import ViewOnly from "../components/design/viewOnly/ViewOnly";

export default function Routess() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/forgotpassword"
          element={<ForgotPassword />}
        ></Route>
        <Route
          path="/emailVerification/:email"
          element={<Verification />}
        ></Route>
        <Route path="/design/:project_id/view" element={<ViewOnly />}></Route>
        <Route path="*" element={<ProtectedRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
