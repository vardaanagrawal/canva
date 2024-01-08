import React, { useState } from "react";
import "./folderCard.css";
import folderSVG from "./folder.svg";
import { useDispatch } from "react-redux";
import {
  updateFolder,
  deleteFolder,
} from "../../../../redux/actions/x3FoldersActions";
import SpinLoader from "../../../utils/spinLoader/SpinLoader";
import { Link } from "react-router-dom";

export default function FolderCard({ folder }) {
  const [openOptionsBox, setOpenOptionsBox] = useState(false);
  return (
    <div className="folder-card">
      <Link to={`/folder/${folder._id}`}>
        <div className="folder-card-img">
          <img src={folderSVG} alt=""></img>
        </div>
        <div className="folder-card-name">{folder.name}</div>
      </Link>
      <div
        className="folder-option-btn"
        onClick={() => {
          setOpenOptionsBox(true);
        }}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
      {openOptionsBox && (
        <FolderOptionsModal
          setOpenOptionsBox={setOpenOptionsBox}
          folder={folder}
        />
      )}
    </div>
  );
}

function FolderOptionsModal({ setOpenOptionsBox, folder }) {
  const dispatch = useDispatch();

  const [starring, setStarring] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function starFolder(folder) {
    setStarring(true);
    await dispatch(
      updateFolder(folder._id, {
        starred: !folder.starred,
      })
    );
    setStarring(false);
  }

  async function handleDeleteFolder(folder) {
    setDeleting(true);
    await dispatch(deleteFolder(folder._id, setDeleting));
    setDeleting(false);
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
      <div className="options-box-img">
        <img src={folderSVG} alt=""></img>
      </div>
      <div className="options-box">
        <div className="options-head">
          <div className="options-name">{folder.name}</div>
        </div>
        <div className="options-body">
          <div
            className="options-box-item"
            onClick={() => {
              if (!starring) starFolder(folder);
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
              {!starring && <i className="fa-regular fa-star"></i>}
              {starring && <SpinLoader height={18} width={18} color="black" />}
            </div>
            {folder.starred ? "Unstar" : "Star"} Folder
          </div>
          <div
            className="options-box-item"
            onClick={() => {
              if (!deleting) handleDeleteFolder(folder);
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
              {deleting && <SpinLoader height={18} width={18} color="black" />}
            </div>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
