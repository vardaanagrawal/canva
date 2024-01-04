import React from "react";
import "./dashboard.css";

import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

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
          
        </div>
      </div>
    </div>
  );
}
