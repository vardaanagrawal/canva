import React from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeIcon, ProjectsIcon, SettingsIcon } from "../../../utils/icons";

export default function Sidebar() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const nameInitials = user.name.charAt(0);

  const theme = useSelector((state) => state.theme);
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-profile-photo">
          {!user.profile_pic && nameInitials}
          {user.profile_pic && <img src={user.profile_pic}></img>}
        </div>
        <div className="sidebar-profile-text">
          <div className="sidebar-profile-name">{user.name}</div>
          <div className="sidebar-profile-email">{user.email}</div>
        </div>
      </div>
      <div className="sidebar-middle">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? `sidebar-item sidebar-item-selected sidebar-item-${theme} sidebar-item-selected-${theme}`
              : `sidebar-item sidebar-item-${theme}`
          }
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          to="/projects"
          className={
            location.pathname === "/projects"
              ? `sidebar-item sidebar-item-selected sidebar-item-${theme} sidebar-item-selected-${theme}`
              : `sidebar-item sidebar-item-${theme}`
          }
        >
          <ProjectsIcon />
          Projects
        </Link>
      </div>
      <div className="sidebar-bottom">
        <Link
          to="/settings"
          className={
            location.pathname === "/settings"
              ? `sidebar-item sidebar-item-selected sidebar-item-${theme} sidebar-item-selected-${theme}`
              : `sidebar-item sidebar-item-${theme}`
          }
        >
          <SettingsIcon />
          Settings
        </Link>
      </div>
    </div>
  );
}
