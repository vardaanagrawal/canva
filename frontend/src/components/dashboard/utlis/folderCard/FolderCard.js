import React from "react";
import "./folderCard.css";
import { useNavigate } from "react-router-dom";
import { FolderCardIcon } from "../../../../utils/icons";
import OptionsBtn from "../optionsBtn/OptionsBtn";
import { useSelector } from "react-redux";

export default function FolderCard({ folder }) {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  return (
    <div className={`folder-card folder-card-${theme}`}>
      <div
        className="folder-card-inner"
        onClick={() => {
          navigate(`/folder/${folder._id}`);
        }}
      >
        <div className="folder-card-img">
          <FolderCardIcon />
        </div>
        <div className="folder-card-text">
          <div className="folder-card-name">{folder.name}</div>
          <div className="folder-card-size">
            {folder.projects.length + folder.uploads.length}{" "}
            {folder.projects.length + folder.uploads.length === 1
              ? "item"
              : "items"}
          </div>
        </div>
      </div>
      <div className="folder-option-btn">
        <OptionsBtn item={folder} type="folder" />
      </div>
    </div>
  );
}

export function FoldersList() {
  const folders = useSelector((state) => state.folders);
  return (
    <div className="projects-list">
      <div className="project-list-head">
        <div className="project-list-head-cell">Name</div>
        <div className="project-list-head-cell project-list-folder-cell">
          Items
        </div>
        <div className="project-list-head-cell project-list-type-cell">
          Type
        </div>
      </div>
      {folders.map((item, index) => (
        <div className="project-list-item" key={item._id}>
          <div className="project-list-item-cell project-list-name-cell">
            <FolderCardIcon />
            {item.name}
          </div>
          <div className="project-list-item-cell project-list-folder-cell">
            {item.projects.length + item.uploads.length}{" "}
            {item.projects.length + item.uploads.length === 1
              ? "item"
              : "items"}
          </div>
          <div className="project-list-item-cell project-list-type-cell">
            Folder
          </div>
          <div className="project-list-item-cell project-list-options-cell">
            <OptionsBtn item={item} type="folder" />
          </div>
        </div>
      ))}
    </div>
  );
}
