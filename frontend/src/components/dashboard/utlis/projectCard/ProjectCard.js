import React, { useState } from "react";
import "./projectCard.css";
import { Link } from "react-router-dom";
import { deleteProject } from "../../../../redux/actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import SpinLoader from "../../../utils/spinLoader/SpinLoader";
import { moveProject } from "../../../../api";

export default function ProjectCard({ project }) {
  const [openOptionsBox, setOpenOptionsBox] = useState(false);

  return (
    <div className="project-card">
      <Link
        to={`/design/${project._id}/edit`}
        className="project-card-img"
      ></Link>
      <div
        className="project-option-btn"
        onClick={() => {
          setOpenOptionsBox(!openOptionsBox);
        }}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <Link to={`/design/${project._id}/edit`} className="project-card-name">
        {project.name}
      </Link>
      {openOptionsBox && (
        <ProjectOptionsModal
          setOpenOptionsBox={setOpenOptionsBox}
          project={project}
        />
      )}
    </div>
  );
}

function ProjectOptionsModal({ setOpenOptionsBox, project }) {
  const dispatch = useDispatch();
  function handleDeleteProject() {
    setDeleting(true);
    dispatch(deleteProject(project._id, setDeleting, setOpenOptionsBox));
  }
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [moving, setMoving] = useState(false);

  const [move, setMove] = useState(false);

  const folders = useSelector((state) => state.user.folders);

  async function handleMoveToFolder() {
    setMoving(true);
    const selectedFolder = document.querySelector(".mtf-item input:checked");
    if (selectedFolder) {
      const res = await moveProject(project._id, selectedFolder.value);
      if (res.success) {
        // dispatch krke redux me state update krna h yaha
      } else {
        alert(res.message);
      }
      setOpenOptionsBox(false);
    }
    setMoving(false);
  }

  return (
    <div
      className="options-page"
      onClick={(e) => {
        if (e.target.className === "options-page") {
          setOpenOptionsBox(false);
        }
      }}
    >
      <div
        className="options-box-img"
        style={{
          height: "150px",
          width: "80%",
          maxWidth: "300px",
          backgroundColor: "gray",
          border: "solid black 1px",
          borderRadius: "5px",
        }}
      ></div>
      {!move && (
        <div className="options-box">
          <div className="options-head">
            <div className="options-name">{project.name}</div>
          </div>
          <div className="options-body">
            <div className="options-box-item">
              <i className="fa-regular fa-copy"></i> Make a copy
            </div>
            <div
              className="options-box-item"
              onClick={() => {
                setMove(true);
              }}
            >
              <i className="fa-regular fa-folder"></i> Move to folder
            </div>
            <div className="options-box-item">
              <i className="fa-solid fa-download"></i> Download (Coming Soon)
            </div>
            <div
              className="options-box-item"
              onClick={async () => {
                if (!copied) {
                  await navigator.clipboard.writeText(
                    `http://localhost:3000/design/${project._id}/view`
                  );
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }
              }}
            >
              <i className="fa-solid fa-link"></i>
              {copied ? "Copied" : "Copy link"}
            </div>
            <div
              className="options-box-item"
              onClick={() => {
                handleDeleteProject();
              }}
            >
              <div
                style={{
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!deleting && <i className="fa-regular fa-trash-can"></i>}
                {deleting && (
                  <SpinLoader height={18} width={18} color="black" />
                )}
              </div>
              Move to trash
            </div>
          </div>
        </div>
      )}
      {move && (
        <div className="options-box">
          <div className="mtf-head">
            <i
              className="fa-solid fa-arrow-left"
              onClick={() => {
                setMove(false);
              }}
            ></i>{" "}
            Select Folder
          </div>
          <div className="mtf-body">
            {folders.length > 0 &&
              folders.map((item, index) => (
                <div className="mtf-item" key={item._id}>
                  <input
                    type="radio"
                    id={item._id}
                    name="mf-radio"
                    value={item._id}
                  ></input>
                  <label htmlFor={item._id}>{item.name}</label>
                </div>
              ))}
            {folders.length === 0 && (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <img
                  src="https://static.canva.com/web/images/72cfe57eb26946bdc5254f3885d0a51f.png"
                  alt=""
                  style={{ height: "50%" }}
                ></img>
                <div>No projects to move</div>
              </div>
            )}
          </div>
          <div className="mtf-foot">
            {/* <button>Create new folder</button> */}
            <button
              onClick={() => {
                if (!moving) {
                  handleMoveToFolder();
                }
              }}
            >
              {!moving && "Move to folder"}
              {moving && <SpinLoader height={25} width={25} color="black" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
