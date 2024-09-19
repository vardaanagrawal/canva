import React, { useState } from "react";
import "./projectCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FolderIcon } from "../../../../utils/icons";
import OptionsBtn from "../optionsBtn/OptionsBtn";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  return (
    <div className="project-card-outer" key={project._id}>
      <div
        className={`project-card`}
        onClick={() => {
          navigate(`/design/${project._id}/edit`);
        }}
      >
        <div className={`project-card-img  project-card-img-${theme}`}>
          <img
            src={project.thumbnail}
            alt=""
            style={{ borderRadius: "5px" }}
          ></img>
        </div>
        <div className="project-card-name">{project.name}</div>
        <div style={{ fontSize: "smaller" }}>{project.project_type}</div>
        {project.folder && project.folder._id && (
          <div className="project-folder-tag">
            <FolderIcon />
            {project.folder.name}
          </div>
        )}
        {!project.folder && <div style={{ height: "16px" }}></div>}
      </div>
      <div className={`project-option-btn`} style={{ display: "flex" }}>
        <OptionsBtn item={project} type="project" />
      </div>
    </div>
  );
}

export function ProjectsList() {
  const projects = useSelector((state) => state.projects);
  return (
    <div className="projects-list">
      <div className="project-list-head">
        <div className="project-list-head-cell">Name</div>
        <div className="project-list-head-cell project-list-folder-cell">
          Folder
        </div>
        <div className="project-list-head-cell project-list-type-cell">
          Type
        </div>
      </div>
      {projects.map((item, index) => (
        <div className="project-list-item" key={item._id}>
          <div className="project-list-item-cell project-list-name-cell">
            <img
              src={item.thumbnail}
              style={{
                height: "80%",
                aspectRatio: 1,
                border: "solid silver 1px",
                borderRadius: "5px",
              }}
            ></img>
            {item.name}
          </div>
          <div className="project-list-item-cell project-list-folder-cell">
            {item.folder ? item.folder.name : "--"}
          </div>
          <div className="project-list-item-cell project-list-type-cell">
            Design
          </div>
          <div className="project-list-item-cell project-list-options-cell">
            <OptionsBtn item={item} type="project" />
          </div>
        </div>
      ))}
    </div>
  );
}
