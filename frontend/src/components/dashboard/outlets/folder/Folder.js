import React, { useEffect, useState } from "react";
import "./folder.css";

import ProjectCard from "../../utlis/projectCard/ProjectCard";
import { useSelector } from "react-redux";

export default function Folder() {
  const [folder, setFolder] = useState({});
  const [projects, setProjects] = useState([]);
  const [uploads, setUploads] = useState([]);
  const folders = useSelector((state) => state.folders);
  const allProjects = useSelector((state) => state.projects);
  const allUploads = useSelector((state) => state.uploads);

  useEffect(() => {
    const url = window.location.href;
    const folderId = url.split("/")[4];
    setFolder(folders.filter((x) => x._id === folderId)[0]);
  }, [folders]);

  useEffect(() => {
    setProjects(allProjects.filter((x) => x.folder === folder._id));
  }, [folder]);

  const [nav, setNav] = useState(0);

  return (
    <div className="projects-page">
      <div className="folder-address">
        Projects {">"} {folder.name}
      </div>
      <div className="projects-head">
        <div className="projects-title">{folder.name}</div>
        <div style={{ position: "relative" }}>
          <div
            className="projects-add-new-btn"
            onClick={() => {
              // setAddModal(!addModal);
            }}
          >
            <i className="fa-solid fa-plus"></i>Add new
          </div>
        </div>
      </div>
      <div className="projects-body-nav">
        <div
          className="projects-body-nav-item"
          onClick={() => {
            setNav(0);
          }}
          // style={{ fontWeight: nav === 1 && "bold" }}
          style={{ borderBottom: nav === 0 && "solid 4px #8b3dff" }}
        >
          Designs
        </div>
        <div
          className="projects-body-nav-item"
          onClick={() => {
            setNav(1);
          }}
          // style={{ fontWeight: nav === 2 && "bold" }}
          style={{ borderBottom: nav === 1 && "solid 4px #8b3dff" }}
        >
          Uploads
        </div>
      </div>
      {nav === 0 && projects.length === 0 && (
        <div className="no-projects-box">
          <img
            src="https://static.canva.com/web/images/72cfe57eb26946bdc5254f3885d0a51f.png"
            alt=""
          ></img>
          <div className="no-projects-box-title">Add your amazing designs</div>
        </div>
      )}
      {nav === 0 && projects.length > 0 && (
        <div className="projects-page-projects-list">
          {projects.map((item, index) => (
            <ProjectCard project={item} key={index} />
          ))}
        </div>
      )}
      {nav === 1 && [].length === 0 && (
        <div className="no-projects-box">
          <img
            src="https://static.canva.com/web/images/ceafbbae0e64011619bc0f490935a031.png"
            alt=""
          ></img>
          <div className="no-projects-box-title">
            Upload, store and organize your images
          </div>
        </div>
      )}
      {nav === 1 && [].length > 0 && (
        <div className="projects-page-uploads-list">
          {uploads.map((item, index) => (
            <div className="project-page-uploads-item" key={index}>
              <img src={item.image_url} alt=""></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
