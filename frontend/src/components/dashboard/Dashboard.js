import React from "react";
import "./dashboard.css";

import { Link, Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { HomeIcon, ProjectsIcon, SettingsIcon } from "../../utils/icons";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const theme = useSelector((state) => state.theme);
  return (
    <div className={`dashboard dashboard-${theme}`}>
      <Navbar />
      <div className="dashboard-bottom">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
        <div className={`mobile-nav mobile-nav-${theme}`}>
          <Link to="/">
            <HomeIcon />
          </Link>
          <Link to="projects">
            <ProjectsIcon />
          </Link>
          <Link to="settings">
            <SettingsIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
