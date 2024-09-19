import React, { useEffect, useRef, useState } from "react";
import "./projects.css";
import { useDispatch, useSelector } from "react-redux";

// functions
import { createNewFolder } from "../../../../redux/actions/x3FoldersActions";
import { uploadImage } from "../../../../redux/actions/x4UploadsActions";

// components
import SpinLoader from "../../../../utils/SpinLoader";
import ProjectCard, { ProjectsList } from "../../utlis/projectCard/ProjectCard";
import FolderCard, { FoldersList } from "../../utlis/folderCard/FolderCard";
import UploadCard, { UploadsList } from "../../utlis/uploadCard/UploadCard";
import {
  AddFolderIcon,
  DownArrowIcon,
  GridViewIcon,
  ListViewIcon,
  PlusIcon,
  RightArrowIcon,
  UploadIcon,
} from "../../../../utils/icons";

import banner from "../../../../images/projectBanner.webp";
import { useLocation } from "react-router-dom";

export default function Projects() {
  const projects = useSelector((state) => state.projects);
  const folders = useSelector((state) => state.folders);
  const uploads = useSelector((state) => state.uploads);

  const [nav, setNav] = useState(0);

  const [view, setView] = useState("grid");
  const navs = ["All", "Designs", "Folders", "Images"];

  const [allFolders, setAllFolders] = useState(true);
  const [allDesigns, setAllDesigns] = useState(true);
  const [allUploads, setAllUploads] = useState(true);

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const content = queryParams.get("content");
    if (content === "uploads") setNav(3);
  }, [location]);

  const theme = useSelector((state) => state.theme);

  return (
    <div className="projects-page">
      <div className="project-page-banner">
        <img src={banner}></img>
        <div className="project-page-title">Projects</div>
      </div>
      <div className="project-page-actions">
        <button
          className="btn-2"
          onClick={() => {
            setView(view === "grid" ? "list" : "grid");
          }}
        >
          {view === "grid" && <ListViewIcon />}
          {view === "list" && <GridViewIcon />}
        </button>
        <AddNewBtn setNav={setNav} />
      </div>
      {/* ----------------------------------------------------------------------------- */}
      <div className="projects-body-nav">
        {navs.map((item, index) => (
          <div
            key={index}
            className="btn-2"
            onClick={() => {
              setNav(index);
            }}
            style={{
              minWidth: index === 0 && "60px",
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
      {/* ----------------------------------------------------------------------------- */}
      {nav === 0 && (
        <div>
          {folders.length === 0 &&
            projects.length === 0 &&
            uploads.length === 0 && (
              <div className="no-projects-box">
                <img
                  src="https://static.canva.com/web/images/ca86a15da2864635746282d93fb8d9b3.png"
                  alt=""
                ></img>
                <div className="no-projects-box-title">
                  Projects is the home for all your content
                </div>
              </div>
            )}
          {folders.length > 0 && (
            <div
              className={`projects-all-section-heading projects-all-section-heading-${theme}`}
              onClick={() => {
                setAllFolders(!allFolders);
              }}
            >
              {allFolders ? <DownArrowIcon /> : <RightArrowIcon />}
              Folders
            </div>
          )}
          {allFolders && view === "grid" && folders.length > 0 && (
            <div className="projects-page-folders-grid">
              {folders.map((item) => (
                <FolderCard folder={item} key={item._id} />
              ))}
            </div>
          )}
          {allFolders && view === "list" && folders.length > 0 && (
            <FoldersList />
          )}
          {projects.length > 0 && (
            <div
              className={`projects-all-section-heading projects-all-section-heading-${theme}`}
              onClick={() => {
                setAllDesigns(!allDesigns);
              }}
            >
              {allDesigns ? <DownArrowIcon /> : <RightArrowIcon />}
              Designs
            </div>
          )}
          {allDesigns &&
            projects.length > 0 &&
            (view === "grid" ? (
              <div className="projects-page-projects-grid">
                {projects.map((item) => (
                  <ProjectCard project={item} key={item._id} />
                ))}
              </div>
            ) : (
              <ProjectsList />
            ))}
          {uploads.length > 0 && (
            <div
              className={`projects-all-section-heading projects-all-section-heading-${theme}`}
              onClick={() => {
                setAllUploads(!allUploads);
              }}
            >
              {allUploads ? <DownArrowIcon /> : <RightArrowIcon />}
              Images
            </div>
          )}
          {allUploads && view === "grid" && uploads.length > 0 && (
            <div className="projects-page-uploads-grid">
              {uploads.map((item) => (
                <UploadCard item={item} key={item._id} />
              ))}
            </div>
          )}
          {allUploads && view === "list" && uploads.length > 0 && (
            <UploadsList />
          )}
        </div>
      )}
      {nav === 1 && projects.length === 0 && (
        <div className="no-projects-box">
          <img
            src="https://static.canva.com/web/images/ca86a15da2864635746282d93fb8d9b3.png"
            alt=""
          ></img>
          <div className="no-projects-box-title">Add your amazing designs</div>
        </div>
      )}
      {nav === 1 &&
        projects.length > 0 &&
        (view === "grid" ? (
          <div className="projects-page-projects-grid">
            {projects.map((item) => (
              <ProjectCard project={item} key={item._id} />
            ))}
          </div>
        ) : (
          <ProjectsList />
        ))}
      {nav === 2 && folders.length === 0 && (
        <div className="no-projects-box">
          <img
            src="https://static.canva.com/web/images/ca86a15da2864635746282d93fb8d9b3.png"
            alt=""
          ></img>
          <div className="no-projects-box-title">
            Stay organized with folders
          </div>
        </div>
      )}
      {nav === 2 && view === "grid" && folders.length > 0 && (
        <div className="projects-page-folders-grid">
          {folders.map((item) => (
            <FolderCard folder={item} key={item._id} />
          ))}
        </div>
      )}
      {nav === 2 && view === "list" && folders.length > 0 && <FoldersList />}
      {nav === 3 && uploads.length === 0 && (
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
      {nav === 3 && view === "grid" && uploads.length > 0 && (
        <div className="projects-page-uploads-grid">
          {uploads.map((item) => (
            <UploadCard item={item} key={item._id} />
          ))}
        </div>
      )}
      {nav === 3 && view === "list" && uploads.length > 0 && <UploadsList />}
    </div>
  );
}

function AddNewBtn({ setNav }) {
  const dispatch = useDispatch();
  const [addModal, setAddModal] = useState(false);
  const nbRef = useRef(null); // add new button ref
  const nmRef = useRef(null); // add new modal ref

  const handleClickOutside = (event) => {
    if (
      nmRef.current &&
      !nmRef.current.contains(event.target) &&
      !nbRef.current.contains(event.target)
    ) {
      setAddModal(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  const [folderModal, setFolderModal] = useState(false);

  const [uploading, setUploading] = useState();

  const user = useSelector((state) => state.user);
  async function handleUpload(imgFile) {
    setUploading(true);
    const res = await dispatch(uploadImage(user._id, imgFile));
    setNav(3);
    setUploading(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        className="btn-2"
        onClick={() => {
          setAddModal(!addModal);
        }}
        ref={nbRef}
      >
        <PlusIcon />
        Add new
      </div>
      {addModal && (
        <div className="project-add-new-modal" ref={nmRef}>
          <h3>Add New</h3>
          <div
            className="project-add-new-item"
            onClick={() => {
              setFolderModal(true);
              setTimeout(() => {
                setAddModal(false);
              }, 100);
            }}
          >
            <AddFolderIcon />
            Folder
          </div>
          <input
            type="file"
            id="project-page-upload-btn"
            style={{ display: "none" }}
            onChange={(e) => {
              handleUpload(e.target.files[0]);
            }}
          ></input>
          <label
            className="project-add-new-item"
            htmlFor="project-page-upload-btn"
          >
            {!uploading && <UploadIcon />}
            {uploading && <SpinLoader height={18} width={18} color="black" />}
            Upload
          </label>
        </div>
      )}
      {folderModal && (
        <NewFolderModal setFolderModal={setFolderModal} setNav={setNav} />
      )}
    </div>
  );
}

function NewFolderModal({ setFolderModal, setNav }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateFolder() {
    setLoading(true);
    await dispatch(
      createNewFolder({
        name: name,
      })
    );
    setLoading(false);
    setFolderModal(false);
    setNav(2);
  }

  return (
    <div
      className="new-folder-modal-page"
      onClick={(e) => {
        if (e.target.className === "new-folder-modal-page")
          setFolderModal(false);
      }}
    >
      <div className="new-folder-modal">
        <h2>Add new folder</h2>
        <div className="new-folder-name">
          <input
            className="new-folder-name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name your folder"
          ></input>
        </div>
        <div
          className={!name ? "create-folder-btn-disabled" : "create-folder-btn"}
          onClick={() => {
            if (!loading && name) handleCreateFolder();
          }}
        >
          {loading ? (
            <SpinLoader height={25} width={25} color="white" />
          ) : (
            "Create Folder"
          )}
        </div>
      </div>
    </div>
  );
}
