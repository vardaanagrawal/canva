import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Dashboard from "../components/dashboard/Dashboard";
import Home from "../components/dashboard/outlets/home/Home";
import Projects from "../components/dashboard/outlets/projects/Projects";
import Design from "../components/design/Design";

import { useDispatch } from "react-redux";
import { getUser } from "../api/userAPI";
import { updateUserDetails } from "../redux/actions/userActions";
import Folder from "../components/dashboard/outlets/folder/Folder";

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
      // navigate("/login");
      console.log("token not found");
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // fetching user details from database with user id found in local storage
  async function fetchUserDetails(token) {
    const res = await getUser(token);
    console.log("get user response: ", res);
    if (res.success) {
      // user found in database
      // updating user details in redux
      dispatch(updateUserDetails(res.user));
      setLoading(false);
    } else {
      // user not found in database
      // navigate("/login");
      console.log("get user response not success");
    }
  }
  return loading ? (
    "Loading"
  ) : (
    <Routes>
      <Route exact path="/" element={<Dashboard />}>
        <Route exact path="" element={<Home />}></Route>
        <Route exact path="/projects" element={<Projects />}></Route>
        <Route exact path="/folder/:id" element={<Folder />}></Route>
      </Route>
      <Route path="/design/:id/edit" element={<Design />}></Route>
    </Routes>
  );
}
