import React from "react";
import "./dashboard.css";

import { Link, Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { HomeIcon, ProjectsIcon } from "../utils/icons/icons";

export default function Dashboard() {
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
            <HomeIcon />
          </Link>
          <Link to="projects">
            <ProjectsIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
