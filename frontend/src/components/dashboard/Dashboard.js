import React, { useState } from "react";
import "./dashboard.css";

import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
// import Sidebar from "../sidebar/Sidebar";

export default function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div className="dashboard">
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="dashboard-bottom">
        {/* {openSidebar && <Sidebar />} */}
        <div
          className="outlet"
          // style={{ width: openSidebar ? "calc(100% - 320px)" : "100%" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
