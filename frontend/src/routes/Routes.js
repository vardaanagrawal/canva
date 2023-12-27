import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../api";
import { updateUserDetails } from "../redux/actions/userActions";

import ProtectedRoutes from "./ProtectedRoutes";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import Verification from "../components/authentication/Verification";

export default function Routess() {
  const [loading, setLoading] = useState(true);
  const [pro, setProtected] = useState(false);

  useEffect(() => {
    // searching for user id in local storage
    const id = localStorage.getItem("Canva_User");
    if (id) {
      // fetching user details if user id present in local storage
      fetchUserDetails(id);
    } else {
      // user id not found in local storage so setting loading and protected false so that it can redirect to login
      setLoading(false);
      setProtected(false);
    }
  }, []);

  const dispatch = useDispatch();
  // fetching user details from database with user id found in local storage
  async function fetchUserDetails(id) {
    const res = await getUser(id);
    if (res.success) {
      // user found in database
      // updating user details in redux
      dispatch(updateUserDetails(res.user));
      setLoading(false);
      setProtected(true);
    } else {
      // user not found in database
      setLoading(false);
      setProtected(false);
    }
  }
  return loading ? (
    "Loading"
  ) : (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          path="/emailVerification/:email"
          element={<Verification />}
        ></Route>
        <Route
          path="*"
          element={pro ? <ProtectedRoutes /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
