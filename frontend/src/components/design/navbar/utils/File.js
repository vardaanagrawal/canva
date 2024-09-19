import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CopyIcon,
  CreateNewIcon,
  DocumentIcon,
  FolderIcon,
  LeftArrowIcon,
  SaveIcon,
  UploadIcon,
  XIcon,
} from "../../../../utils/icons";
import {
  manageElement,
  saveProject,
} from "../../../../redux/actions/x5ProjectActions";
import { showSidebar2 } from "../../../../redux/actions/x7Sidebar2Actions";
import { uploadImage } from "../../../../redux/actions/x4UploadsActions";
import SpinLoader from "../../../../utils/SpinLoader";
import {
  copyProject,
  createNewProject,
  moveProject,
} from "../../../../redux/actions/x2ProjectsActions";

import domtoimage from "dom-to-image";

import { newProjectsList } from "../../../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function File() {
  const [fileDD, setFileDD] = useState(false);

  const fbRef = useRef(null); // create button ref
  const fdRef = useRef(null); // create dropdown ref
  const handleClickOutside = (event) => {
    if (
      fdRef.current && // tells us that whether the create dropdown  is open or not
      !fdRef.current.contains(event.target) && // tells us whether clicked item is create dropdown or not
      !fbRef.current.contains(event.target) // tells us whether clicked item is create button or not
    ) {
      setFileDD(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return (
    <div>
      <div
        className="dn-file-btn"
        ref={fbRef}
        onClick={() => {
          setFileDD(!fileDD);
        }}
        style={{
          background: fileDD && "rgba(255, 255, 255, 0.25)",
        }}
      >
        File
      </div>
      {fileDD && <FileDD fdRef={fdRef} setFileDD={setFileDD} />}
    </div>
  );
}

function FileDD({ fdRef, setFileDD }) {
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);

  const [name, setName] = useState(project.name);
  useEffect(() => {
    setName(project.name);
  }, [project]);

  const dispatch = useDispatch();
  function handleName() {
    document.querySelector(".file-dd-name input").blur();
    if (name.trim() === "") {
      setName("Untitled Project");
    }
    dispatch(
      manageElement({
        action: "update",
        element: "project",
        data: {
          _id: project._id,
          name: name,
        },
      })
    );
  }

  const [uploading, setUploading] = useState();
  async function handleUpload(imgFile) {
    setUploading(true);
    const res = await dispatch(uploadImage(user._id, imgFile));
    if (res.success) {
      setFileDD(false);
      dispatch(
        showSidebar2({
          visible: true,
          type: "uploads",
        })
      );
    }
    setUploading(false);
  }

  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    const canvas = document.querySelector(".page-container");
    domtoimage
      .toPng(canvas)
      .then(async function (dataUrl) {
        await dispatch(saveProject(dataUrl, project));
        setSaving(false);
      })
      .catch(function (error) {
        setSaving(false);
      });
  };

  const [copying, setCopying] = useState(false);
  const handleCopy = async () => {
    setCopying(true);
    const res = await dispatch(copyProject(project._id));
    if (res.success) {
      window.open(
        `http://localhost:3000/design/${res.project._id}/edit`,
        "_blank"
      );
    }
    setCopying(false);
  };

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(-1);

  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
    };
    const res = await dispatch(createNewProject(newProjectData, navigate));
    setLoading(-1);
    setFileDD(false);
  }

  const folders = useSelector((state) => state.folders);

  async function handleSaveToFolder(item) {
    await dispatch(saveProject(project));
    const data = {
      projectId: project._id,
      from: project.folder,
      to: item._id,
    };
    await dispatch(moveProject(data));
    setLoading(-1);
  }

  return (
    <div className="file-dd" ref={fdRef}>
      {page === 1 && (
        <div className="file-dd-page">
          <div className="file-dd-name">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleName();
              }}
            >
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onBlur={() => {
                  handleName();
                }}
              ></input>
            </form>
            <div className="file-dd-user">
              By {user.name} | {project.project_type} | {project.pages[0].width}
              px <XIcon /> {project.pages[0].height}px
            </div>
          </div>
          <div className="file-dd-section2">
            <div
              className="file-dd-item"
              onClick={() => {
                setPage(2);
              }}
            >
              <CreateNewIcon />
              Create New Design
            </div>
            <input
              type="file"
              id="dn-file-upload-input"
              style={{ display: "none" }}
              onChange={(e) => {
                handleUpload(e.target.files[0]);
              }}
            ></input>
            <label className="file-dd-item" htmlFor="dn-file-upload-input">
              {!uploading && <UploadIcon />}
              {uploading && <SpinLoader height={18} width={18} color="black" />}
              Upload Files
            </label>
          </div>
          <div className="file-dd-section3">
            <div className="file-dd-item" onClick={save}>
              {!saving && <SaveIcon />}
              {saving && <SpinLoader height={18} width={18} color="black" />}
              Save
            </div>
            <div
              className="file-dd-item"
              onClick={() => {
                setPage(3);
              }}
            >
              <FolderIcon />
              Save to folder
            </div>
            <div className="file-dd-item" onClick={handleCopy}>
              {!copying && <CopyIcon />}
              {copying && <SpinLoader height={18} width={18} color="black" />}
              Make a copy
            </div>
            {/* <div className="file-dd-item">
          <DownloadIcon />
          Download (Coming Soon)
        </div> */}
          </div>
        </div>
      )}
      {page === 2 && (
        <div className="file-dd-page">
          <div className="file-dd-page-title">
            <div
              onClick={() => {
                setPage(1);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LeftArrowIcon />
            </div>
            Create new Design
          </div>
          <div className="file-dd-page-body">
            {[].concat(...Object.values(newProjectsList)).map((item, index) => (
              <div
                className="file-dd-item"
                key={index}
                onClick={() => {
                  setLoading(index);
                  handleCreateNewProject(item);
                }}
              >
                {loading !== index && <DocumentIcon />}
                {loading === index && (
                  <SpinLoader height={18} width={18} color="black" />
                )}
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {page === 3 && (
        <div className="file-dd-page">
          <div className="file-dd-page-title">
            <div
              onClick={() => {
                setPage(1);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LeftArrowIcon />
            </div>
            Save to folder
          </div>
          <div className="file-dd-page-body">
            {folders.map((item, index) => (
              <div
                className="file-dd-item"
                key={index}
                onClick={() => {
                  setLoading(index);
                  // handleCreateNewProject(item);
                  handleSaveToFolder(item);
                }}
              >
                {loading !== index && <FolderIcon />}
                {loading === index && (
                  <SpinLoader height={18} width={18} color="black" />
                )}
                {item.name}
              </div>
            ))}
            {folders.length === 0 && (
              <div className="file-dd-item">No Folders Available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
