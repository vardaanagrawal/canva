import React, { useEffect, useRef, useState } from "react";
import "./projects.css";
import { createFolder } from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../../../redux/actions/userActions";
import SpinLoader from "../../../utils/spinLoader/SpinLoader";
import ProjectCard from "../../utlis/projectCard/ProjectCard";
import FolderCard from "../../utlis/folderCard/FolderCard";
import axios from "axios";

export default function Projects() {
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

  const [projectModal, setProjectModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);

  const projects = useSelector((state) => state.user.projects);
  const folders = useSelector((state) => state.user.folders);
  const uploads = useSelector((state) => state.user.uploads);

  const [nav, setNav] = useState(0);

  return (
    <div className="projects-page">
      <div className="projects-head">
        <div className="projects-title">Projects</div>
        <div style={{ position: "relative" }}>
          <div
            className="projects-add-new-btn"
            onClick={() => {
              setAddModal(!addModal);
            }}
            ref={nbRef}
          >
            <i className="fa-solid fa-plus"></i>Add new
          </div>
          {addModal && (
            <div className="project-add-new-modal" ref={nmRef}>
              <h3>Add New</h3>
              <div
                className="project-add-new-item"
                onClick={() => {
                  setProjectModal(true);
                  setTimeout(() => {
                    setAddModal(false);
                  }, 100);
                }}
              >
                <i className="fa-regular fa-folder"></i>Folder
              </div>
              <div
                className="project-add-new-item"
                onClick={() => {
                  setUploadModal(true);
                }}
              >
                <i className="fa-solid fa-arrow-up"></i>Upload
              </div>
            </div>
          )}
        </div>
        {projectModal && (
          <NewFolderModal setProjectModal={setProjectModal} setNav={setNav} />
        )}
        {uploadModal && <NewUploadModal setUploadModal={setUploadModal} />}
      </div>
      <div className="projects-body-nav">
        <div
          className="projects-body-nav-selected-marker"
          style={{ left: `${nav * 100 + 15}px` }}
        ></div>
        <div
          className="projects-body-nav-item"
          onClick={() => {
            setNav(0);
          }}
          style={{ fontWeight: nav === 0 && "bold" }}
        >
          Designs
        </div>
        <div
          className="projects-body-nav-item"
          onClick={() => {
            setNav(1);
          }}
          style={{ fontWeight: nav === 1 && "bold" }}
        >
          Folders
        </div>
        <div
          className="projects-body-nav-item"
          onClick={() => {
            setNav(2);
          }}
          style={{ fontWeight: nav === 2 && "bold" }}
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
      {nav === 1 && folders.length === 0 && (
        <div className="no-projects-box">
          <img
            src="https://static.canva.com/web/images/b8377ddee434518b82bb74d3d13e31bd.png"
            alt=""
          ></img>
          <div className="no-projects-box-title">
            Stay organized with folders
          </div>
        </div>
      )}
      {nav === 1 && folders.length > 0 && (
        <div className="projects-page-folders-list">
          {folders.map((item, index) => (
            <FolderCard folder={item} key={item._id} />
          ))}
        </div>
      )}
      {nav === 2 && [].length === 0 && (
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
      {nav === 2 && [].length > 0 && (
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

function NewFolderModal({ setProjectModal, setNav }) {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const projects = useSelector((state) => state.user.projects);
  const [availableProjects, setAvailableProjects] = useState(
    projects.filter((x) => !x.folder)
  );

  useEffect(() => {
    setAvailableProjects(projects);
  }, [projects]);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleCreateFolder() {
    setLoading(true);
    const a = document.querySelectorAll(".project-cb");
    let b = [];
    for (let i = 0; i < a.length; i++) {
      if (a[i].checked) b = [...b, a[i].value];
    }

    const res = await createFolder({
      name: name,
      user_id: user._id,
      projects: b,
    });
    setLoading(false);
    if (res.success) {
      dispatch(updateUserDetails(res.user));
      setProjectModal(false);
      setNav(1);
    } else {
      alert(res.message);
    }
  }

  return (
    <div
      className="new-folder-modal-page"
      onClick={(e) => {
        if (e.target.className === "new-folder-modal-page")
          setProjectModal(false);
      }}
    >
      <div className="new-folder-modal">
        <h2>Add new folder</h2>
        <div className="new-folder-name">
          <div className="new-folder-name-label">Folder Name</div>
          <input
            className="new-folder-name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name your folder"
          ></input>
        </div>
        <div className="new-folder-projects-label">Add Projects</div>
        <div className="new-folder-projects-list">
          {availableProjects.length === 0 && (
            <div className="no-projects-available">
              <img
                src="https://static.canva.com/web/images/72cfe57eb26946bdc5254f3885d0a51f.png"
                alt=""
              ></img>
              <div>No projects to add</div>
            </div>
          )}
          {availableProjects.map((item, index) => (
            <div className="new-folder-projects-list-item" key={item._id}>
              <input
                type="checkbox"
                className="project-cb"
                id={`cb-${item._id}`}
                value={item._id}
              ></input>
              <label htmlFor={`cb-${item._id}`}>{item.name}</label>
            </div>
          ))}
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

function NewUploadModal({ setUploadModal }) {
  async function testFunc() {
    // const res = await axios.get("http://localhost:5000/api/auth/test");
    // console.log(res);
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=935328519410-r1fteedhjia91adkoagjjqb5q4sdvh8k.apps.googleusercontent.com&redirect_uri=http://localhost:5000/api/auth/google&response_type=code&scope=profile%20email"
  }
  return (
    <div
      className="new-upload-modal-page"
      onClick={(e) => {
        if (e.target.className === "new-upload-modal-page")
          setUploadModal(false);
      }}
    >
      <div className="new-upload-modal">
        {/* <h2>Upload an image</h2> */}
        <button
          onClick={() => {
            testFunc();
          }}
        >
          Signin
        </button>
        <button>Fetch Files</button>
        <div className="new-upload-preview">
          <img className="new-upload-preview-img" alt=""></img>
        </div>
        <div className="create-folder-btn">Save</div>
      </div>
    </div>
  );
}
