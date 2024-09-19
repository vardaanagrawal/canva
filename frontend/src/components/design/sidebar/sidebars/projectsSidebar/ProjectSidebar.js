import React from "react";
import "./projectsSidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectCard from "../../../../dashboard/utlis/projectCard/ProjectCard";

export default function ProjectSidebar() {
  const projects = useSelector((state) => state.projects);
  return (
    <div className="elements-sidebar">
      <div className="elements-sidebar-title">Projects</div>
      <div className="sidebar2-body projects-sidebar-body">
        {projects.map((item, index) => (
          <Link
            to={`/design/${item._id}/edit`}
            className="project-sidebar-item"
            key={item._id}
          >
            <div className="project-sidebar-item-img">
              <img src={item.thumbnail} alt=""></img>
            </div>
            <div className="project-sidebar-item-text">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
