import React, { useState } from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HomeIcon,
  ProjectsIcon,
  SettingsIcon,
  TrashIcon,
} from "../../utils/icons/icons";

export default function Sidebar() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const name = user.name.split(" ");
  const nameInitials = name.map((word) => word.charAt(0)).join("");
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-profile-photo">{nameInitials}</div>
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
              ? "sidebar-item sidebar-item-selected"
              : "sidebar-item"
          }
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          to="/projects"
          className={
            location.pathname === "/projects"
              ? "sidebar-item sidebar-item-selected"
              : "sidebar-item"
          }
        >
          <ProjectsIcon />
          Projects
        </Link>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-item">
          <TrashIcon />
          Trash
        </div>
        <div className="sidebar-item">
          <SettingsIcon />
          Settings
        </div>
      </div>
    </div>
  );
}
