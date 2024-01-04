import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-profile">
          <div className="sidebar-profile-photo"></div>
          <div className="sidebar-profile-name">{user.name}</div>
        </div>
        <Link to="/" className="sidebar-item">
          <i className="fa-solid fa-house"></i>Home
        </Link>
        <Link to="/projects" className="sidebar-item">
          <i className="fa-solid fa-folder"></i>Projects
        </Link>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-item">
          <i className="fa-solid fa-trash"></i>Trash
        </div>
        <div className="sidebar-item">
          <i className="fa-solid fa-gear"></i>Settings
        </div>
      </div>
    </div>
  );
}
