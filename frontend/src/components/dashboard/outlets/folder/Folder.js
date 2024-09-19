import React, { useEffect, useState } from "react";
import "./folder.css";

import ProjectCard from "../../utlis/projectCard/ProjectCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UploadCard from "../../utlis/uploadCard/UploadCard";

import banner from "../../../../images/projectBanner.webp";

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
    setProjects(
      allProjects.filter((x) => x.folder && x.folder._id === folder._id)
    );
    setUploads(
      allUploads.filter((x) => x.folder && x.folder._id === folder._id)
    );
  }, [folder]);

  const [nav, setNav] = useState(0);

  return (
    <div className="projects-page">
      <div className="project-page-banner">
        <img src={banner}></img>
        <div className="project-page-title">{folder.name}</div>
      </div>
      {/* ################################################################################# */}
      <div className="projects-body-nav" style={{ margin: "10px 0px" }}>
        {["Designs", "Images"].map((item, index) => (
          <div
            key={index}
            className="btn-2"
            onClick={() => {
              setNav(index);
            }}
            style={{
              backgroundColor: nav === index && "#8b3dff",
              color: nav === index && "white",
              transition: "all 0s",
              borderColor: nav === index && "#8b3dff",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {nav === 0 && projects.length === 0 && (
        <div className="no-projects-box">
          <img
            src="https://static.canva.com/web/images/ca86a15da2864635746282d93fb8d9b3.png"
            alt=""
          ></img>
          <div className="no-projects-box-title">Add your amazing designs</div>
        </div>
      )}
      {nav === 0 && projects.length > 0 && (
        <div className="projects-page-projects-grid">
          {projects.map((item) => (
            <ProjectCard project={item} key={item._id} />
          ))}
        </div>
      )}
      {nav === 1 && uploads.length === 0 && (
        <div className="no-projects-box">
          <img
            src="https://static.canva.com/web/images/ca86a15da2864635746282d93fb8d9b3.png"
            alt=""
          ></img>
          <div className="no-projects-box-title">
            Upload, store and organize your images
          </div>
        </div>
      )}
      {nav === 1 && uploads.length > 0 && (
        <div className="projects-page-uploads-grid">
          {uploads.map((item, index) => (
            <div className="project-page-uploads-item" key={index}>
              <UploadCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
