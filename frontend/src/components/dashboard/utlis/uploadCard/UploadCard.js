import React from "react";
import { FolderIcon } from "../../../../utils/icons";
import { useSelector } from "react-redux";
import OptionsBtn from "../optionsBtn/OptionsBtn";

export default function UploadCard({ item }) {
  const theme = useSelector((state) => state.theme);
  return (
    <div className="project-card-outer" key={item._id}>
      <div className="project-card" style={{ zIndex: 1 }}>
        <div className={`project-card-img project-card-img-${theme}`}>
          <img src={item.url} alt=""></img>
        </div>
        <div className="project-card-name">{item.name}</div>
        {item.folder && item.folder._id && (
          <div className="project-folder-tag">
            <FolderIcon />
            {item.folder && item.folder.name}
          </div>
        )}
        {!item.folder && <div style={{ height: "16px" }}></div>}
      </div>
      <div
        style={{
          height: "30px",
          width: "30px",
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
      >
        <OptionsBtn item={item} type="upload" />
      </div>
    </div>
  );
}

export function UploadsList() {
  const uploads = useSelector((state) => state.uploads);
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
      {uploads.map((item, index) => (
        <div className="project-list-item" key={item._id}>
          <div className="project-list-item-cell project-list-name-cell">
            <img
              src={item.url}
              style={{
                height: "80%",
                aspectRatio: 1,
                border: "solid silver 1px",
                borderRadius: "5px",
              }}
            ></img>
            {/* {item.name} */}
            Untitled Image
          </div>
          <div className="project-list-item-cell project-list-folder-cell">
            {item.folder ? item.folder.name : "--"}
            {/* -- */}
          </div>
          <div className="project-list-item-cell project-list-type-cell">
            Image
          </div>
          <div className="project-list-item-cell project-list-options-cell">
            <OptionsBtn item={item} type="upload" />
          </div>
        </div>
      ))}
    </div>
  );
}
