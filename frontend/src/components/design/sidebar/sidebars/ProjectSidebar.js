import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProjectSidebar() {
  const user = useSelector((state) => state.user);
  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Projects</div>
      <div className="sidebar2-body projects-sidebar-body">
        {user.projects.map((item, index) => (
          <Link
            to={`/design/${item._id}`}
            className="project-sidebar-item"
            key={item._id}
          >
            <div className="project-sidebar-item-img"></div>
            <div className="project-sidebar-item-text">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
