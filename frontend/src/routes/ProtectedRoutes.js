import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Home from "../components/home/Home";
import Design from "../components/design/Design";

import { useDispatch } from "react-redux";
import { getUser } from "../api";
import { updateUserDetails } from "../redux/actions/userActions";

export default function ProtectedRoutes() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // searching for user id in local storage
    const token = localStorage.getItem("Canva_User");
    if (token) {
      // fetching user details if user id present in local storage
      fetchUserDetails(token);
    } else {
      // user id not found in local storage so setting loading and protected false so that it can redirect to login
      navigate("/login");
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // fetching user details from database with user id found in local storage
  async function fetchUserDetails(token) {
    const res = await getUser(token);
    if (res.success) {
      // user found in database
      // updating user details in redux
      dispatch(updateUserDetails(res.user));
      setLoading(false);
    } else {
      // user not found in database
      navigate("/login");
    }
  }
  return loading ? (
    "Loading"
  ) : (
    <Routes>
      <Route exact path="/" element={<Dashboard />}>
        <Route exact path="" element={<Home />}></Route>
      </Route>
      <Route path="/design/:id/edit" element={<Design />}></Route>
    </Routes>
  );
}
