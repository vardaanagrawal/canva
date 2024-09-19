import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getUser } from "../api/userAPI";
import { setUser } from "../redux/actions/x1UserActions";
import SpinLoader from "../utils/SpinLoader";

const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const Home = lazy(() => import("../components/dashboard/outlets/home/Home"));
const Projects = lazy(() =>
  import("../components/dashboard/outlets/projects/Projects")
);
const Folder = lazy(() =>
  import("../components/dashboard/outlets/folder/Folder")
);
const Settings = lazy(() =>
  import("../components/dashboard/outlets/settings/Settings")
);
const Design = lazy(() => import("../components/design/Design"));
const ViewOnly = lazy(() => import("../components/viewOnly/ViewOnly"));

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
      dispatch(setUser(res.user));
      setLoading(false);
    } else {
      // user not found in database
      navigate("/login");
    }
  }
  return loading ? (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <SpinLoader height={40} width={40} color="black" />
    </div>
  ) : (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route exact path="/" element={<Dashboard />}>
          <Route exact path="" element={<Home />}></Route>
          <Route exact path="/projects" element={<Projects />}></Route>
          <Route exact path="/folder/:id" element={<Folder />}></Route>
          <Route exact path="/settings" element={<Settings />}></Route>
        </Route>
        <Route path="/design/:id/edit" element={<Design />}></Route>
        <Route path="/design/:id/view" element={<ViewOnly />}></Route>
      </Routes>
    </Suspense>
  );
}
