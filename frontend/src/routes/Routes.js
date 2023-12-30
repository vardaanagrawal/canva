import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../api";
import { updateUserDetails } from "../redux/actions/userActions";

import ProtectedRoutes from "./ProtectedRoutes";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import Verification from "../components/authentication/Verification";
import ViewOnly from "../components/viewOnly/ViewOnly";
import ForgotPassword from "../components/authentication/ForgotPassword";

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
