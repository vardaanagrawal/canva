import React from "react";
import "./dashboard.css";

import { Link, Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // const state = useSelector((state) => state);
  // console.log(state);
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-bottom">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
        <div className="mobile-nav-container">
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
          <Link to="projects">
            <i className="fa-solid fa-folder"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
