import React from "react";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <div className="sidebar-item-icon">
          <i className="fa-solid fa-house"></i>
        </div>
        <div className="sidebar-item-text">Home</div>
      </div>
      <div className="sidebar-item">
        <div className="sidebar-item-icon">
          <i className="fa-solid fa-folder"></i>
        </div>
        <div className="sidebar-item-text">Projects</div>
      </div>
      <div className="sidebar-item">
        <div className="sidebar-item-icon">
          <i className="fa-solid fa-user-group"></i>
        </div>
        <div className="sidebar-item-text">Teams</div>
      </div>
    </div>
  );
}
