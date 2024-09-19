import React, { useEffect, useRef, useState } from "react";
import "./optionsBtn.css";
import {
  CopyIcon,
  FolderIcon,
  HorizontalEllipsis,
  LeftArrowIcon,
  LinkIcon,
  OpenInNewTabIcon,
  PencilIcon,
  RightArrowIcon,
  TrashIcon,
} from "../../../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  copyProject,
  deleteProject,
  moveProject,
  updateProject,
} from "../../../../redux/actions/x2ProjectsActions";
import SpinLoader from "../../../../utils/SpinLoader";
import {
  createNewFolder,
  deleteFolder,
  updateFolder,
} from "../../../../redux/actions/x3FoldersActions";
import {
  deleteUpload,
  moveUpload,
  updateUpload,
} from "../../../../redux/actions/x4UploadsActions";
import { Link } from "react-router-dom";

export default function OptionsBtn({ item, type }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const ddRef = useRef(null); // dropdown ref
  const handleClickOutside = (event) => {
    if (
      ddRef.current &&
      !ddRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  const [ww, setWW] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWW(window.innerWidth);
  });
  // #######################################################################################################################
  // #######################################################################################################################
  const [position, setPosition] = useState({
    top: 30,
    right: 0,
    bottom: "auto",
    left: "auto",
  });
  const calculatePosition = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    const spaceLeft = buttonRect.left - 300;
    if (spaceBelow >= spaceAbove - 70) {
      setPosition({ top: "35px", right: "0px", bottom: "auto", left: "auto" });
      if (spaceLeft < 300) {
        setPosition({
          top: "35px",
          right: "auto",
          bottom: "auto",
          left: "0px",
        });
      }
    } else if (spaceAbove - 70 > spaceBelow) {
      setPosition({ top: "auto", right: "0px", bottom: "35px", left: "auto" });
      if (spaceLeft < 300) {
        setPosition({
          top: "auto",
          right: "auto",
          bottom: "35px",
          left: "0px",
        });
      }
    }
    if (spaceAbove < 30 || spaceBelow < -30) setOpen(false);
  };

  useEffect(() => {
    const outlet = document.querySelector(".outlet");
    if (outlet) {
      outlet.addEventListener("scroll", () => {
        if (ddRef.current) {
          calculatePosition();
        }
      });
    }
  }, []);
  const modal = {
    project: <ProjectOptions project={item} />,
    folder: <FolderOptions folder={item} />,
    upload: <UploadOptions upload={item} />,
  };

  const theme = useSelector((state) => state.theme);

  return (
    <div className="options-btn-box">
      <div
        className={`options-btn options-btn-${theme}`}
        onClick={() => {
          if (ww > 650) {
            calculatePosition();
          }
          setOpen(!open);
        }}
        ref={buttonRef}
        style={{
          display: open && "flex",
          backgroundColor: open && "#8b3dff",
          color: open && "white",
        }}
      >
        <HorizontalEllipsis />
      </div>
      {open && ww > 650 && (
        <div
          className="options-dd"
          ref={ddRef}
          style={{
            top: position.top,
            right: position.right,
            bottom: position.bottom,
            left: position.left,
          }}
        >
          {modal[type]}
        </div>
      )}
      {open && ww <= 650 && (
        <div className="options-dd-mobile" ref={ddRef}>
          {modal[type]}
        </div>
      )}
    </div>
  );
}

function ProjectOptions({ project }) {
  if (!project.folder) {
    project.folder = {
      _id: "",
    };
  }
  const [name, setName] = useState(project.name);
  const [nameFocus, setNameFocus] = useState(false);
  const folders = useSelector((state) => state.folders);
  const [folder, setFolder] = useState(
    project.folder ? folders.filter((x) => x._id === project.folder)[0] : ""
  );
  useEffect(() => {
    setFolder(
      project.folder
        ? folders.filter((x) => x._id === project.folder._id)[0]
        : ""
    );
  }, [project.folder]);

  // -------------------------------------------------------
  const dispatch = useDispatch();
  const [copying, setCopying] = useState(false);
  const handleCopy = async () => {
    setCopying(true);
    await dispatch(copyProject(project._id));
    setCopying(false);
  };

  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    await dispatch(deleteProject(project));
    setDeleting(false);
  };

  const [copied, setCopied] = useState(false);
  const handleCopyLink = async () => {
    if (!copied) {
      setCopied(true);
      await navigator.clipboard.writeText(
        `http://localhost:3000/design/${project._id}/view`
      );
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };
  // -------------------------------------------------------
  const [page, setPage] = useState(1);

  const [newFolder, setNewFolder] = useState(null);
  const [moving, setMoving] = useState(false);
  const handleMoveToFolder = async () => {
    setMoving(true);
    if (newFolder) {
      const data = {
        projectId: project._id,
        from: project.folder ? project.folder._id : "",
        to: newFolder,
      };
      await dispatch(moveProject(data));
    }
    setMoving(false);
    setPage(1);
  };

  const [updating, setUpdating] = useState(false);

  async function handleNameChange() {
    setUpdating(true);
    await dispatch(updateProject({ project_id: project._id, name: name }));
    setUpdating(false);
  }

  // -------------------------------------------------------
  return (
    <div className="options-dd-box">
      {page === 1 && (
        <div className="options-dd-page1">
          <div className="options-dd-head">
            <form
              className="options-dd-head-section1"
              onSubmit={(e) => {
                e.preventDefault();
                handleNameChange();
              }}
            >
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="options-dd-name-input"
                onFocus={() => {
                  setNameFocus(true);
                }}
                onBlur={() => {
                  setNameFocus(false);
                  handleNameChange();
                }}
                disabled={updating}
              ></input>
              {!nameFocus && !updating && <PencilIcon />}
              {updating && <SpinLoader height={16} width={16} color="black" />}
            </form>
            {folder && (
              <div className="options-dd-head-section2">
                <FolderIcon />
                {folder.name}
              </div>
            )}
          </div>
          <div className="options-dd-body">
            <Link
              to={`/design/${project._id}/edit`}
              target="_blank"
              className="options-dd-item"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="options-dd-item-icon">
                <OpenInNewTabIcon />
              </div>
              <div className="options-dd-item-text">Open in new tab</div>
            </Link>

            {/* <div className="options-dd-item" onClick={handleCopy}>
              <div className="options-dd-item-icon">
                {copying && (
                  <SpinLoader height={18} width={18} color={"black"} />
                )}
                {!copying && <CopyIcon />}
              </div>
              <div className="options-dd-item-text">Make a copy</div>
            </div> */}
            <div
              className="options-dd-item"
              onClick={() => {
                setPage(2);
              }}
            >
              <div className="options-dd-item-icon">
                <FolderIcon />
              </div>
              <div className="options-dd-item-text">Move to folder</div>
              <div className="options-dd-right">
                <RightArrowIcon />
              </div>
            </div>
            <div className="options-dd-item" onClick={handleCopyLink}>
              <div className="options-dd-item-icon">
                <LinkIcon />
              </div>
              <div className="options-dd-item-text">
                {copied ? "Copied to clipboard" : "Copy Link"}
              </div>
            </div>
            <div className="options-dd-item" onClick={handleDelete}>
              <div className="options-dd-item-icon">
                {deleting && (
                  <SpinLoader height={18} width={18} color={"black"} />
                )}
                {!deleting && <TrashIcon />}
              </div>
              <div className="options-dd-item-text">Move to trash</div>
            </div>
          </div>
        </div>
      )}
      {page === 2 && (
        <div className="options-dd-page2">
          <div className="options-dd-page2-head">
            <div
              className="options-dd-back-btn"
              onClick={() => {
                setPage(1);
              }}
            >
              <LeftArrowIcon />
            </div>
            Move to folder
          </div>
          {folders.filter((x) => x._id !== project.folder._id).length === 0 && (
            <div className="options-dd-page2-empty-body">
              <img
                src="https://static.canva.com/web/images/b8377ddee434518b82bb74d3d13e31bd.png"
                alt=""
                style={{
                  height: "30%",
                }}
              ></img>
              <div style={{ fontSize: "smaller" }}>No Folders to move</div>
            </div>
          )}
          {folders.filter((x) => x._id !== project.folder._id).length > 0 && (
            <div className="options-dd-page2-body">
              {folders
                .filter((x) => x._id !== project.folder._id)
                .map((item, index) => (
                  <div
                    className="options-dd-item"
                    key={index}
                    onClick={() => {
                      setNewFolder(newFolder === item._id ? null : item._id);
                    }}
                    style={{
                      backgroundColor: item._id === newFolder && "#8b3dff",
                      color: item._id === newFolder && "white",
                    }}
                  >
                    <div className="options-dd-item-icon">
                      <FolderIcon />
                    </div>
                    <div className="options-dd-item-text">{item.name}</div>
                  </div>
                ))}
            </div>
          )}
          <div className="options-dd-page2-foot">
            <button
              className="create-new-folder-btn"
              style={{ padding: "0px" }}
            >
              <AddNewBtn />
            </button>
            <button
              className="move-to-folder-btn"
              disabled={!newFolder}
              onClick={handleMoveToFolder}
            >
              {moving ? (
                <SpinLoader height={18} width={18} color={"white"} />
              ) : (
                "Move to folder"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FolderOptions({ folder }) {
  const [name, setName] = useState(folder.name);
  const dispatch = useDispatch();
  const [nameFocus, setNameFocus] = useState(false);
  // const [starring, setStarring] = useState(false);
  // const handleStar = async () => {
  //   setStarring(true);
  //   await dispatch(
  //     updateFolder(folder._id, {
  //       starred: !folder.starred,
  //     })
  //   );
  //   setStarring(false);
  // };

  const [updating, setUpdating] = useState(false);
  const handleUpdate = async () => {
    setUpdating(true);
    await dispatch(
      updateFolder(folder._id, {
        name: name,
      })
    );
    setUpdating(false);
  };

  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    await dispatch(deleteFolder(folder._id));
    setDeleting(false);
  };
  return (
    <div className="options-dd-box">
      <div className="options-dd-head">
        <form
          className="options-dd-head-section1"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="options-dd-name-input"
            onFocus={() => {
              setNameFocus(true);
            }}
            onBlur={() => {
              setNameFocus(false);
              handleUpdate();
            }}
            disabled={updating}
          ></input>
          {!nameFocus && !updating && <PencilIcon />}
          {updating && <SpinLoader height={16} width={16} color="black" />}
        </form>
        <div className="options-dd-head-section2">
          {folder.projects.length + folder.uploads.length}{" "}
          {folder.projects.length + folder.uploads.length === 1
            ? "item"
            : "items"}
        </div>
      </div>
      <div className="options-dd-body">
        {/* <div className="options-dd-item" onClick={handleStar}>
          <div className="options-dd-item-icon">
            {starring && <SpinLoader height={18} width={18} color={"black"} />}
            {!starring && <StarIcon />}
          </div>
          <div className="options-dd-item-text">
            {folder.starred ? "Unstar Folder" : "Star folder"}
          </div>
        </div> */}
        <div className="options-dd-item" onClick={handleDelete}>
          <div className="options-dd-item-icon">
            {deleting && <SpinLoader height={18} width={18} color={"black"} />}
            {!deleting && <TrashIcon />}
          </div>
          <div className="options-dd-item-text">Delete folder</div>
        </div>
      </div>
    </div>
  );
}

function UploadOptions({ upload }) {
  if (!upload.folder) {
    upload.folder = {
      _id: "",
    };
  }
  const [name, setName] = useState(upload.name);
  const [nameFocus, setNameFocus] = useState(false);
  const folders = useSelector((state) => state.folders);
  const [folder, setFolder] = useState();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    await dispatch(deleteUpload(upload));
    setDeleting(false);
  };

  const [page, setPage] = useState(1);
  const [newFolder, setNewFolder] = useState();
  const [moving, setMoving] = useState(false);

  const handleMoveToFolder = async () => {
    setMoving(true);
    if (newFolder) {
      const data = {
        upload,
        from: upload.folder ? upload.folder._id : "",
        to: newFolder,
      };
      await dispatch(moveUpload(data));
    }
    setMoving(false);
    setPage(1);
  };

  const [updating, setUpdating] = useState(false);
  const handleUpdate = async () => {
    setUpdating(true);
    await dispatch(
      updateUpload({
        _id: upload._id,
        name: name,
      })
    );
    setUpdating(false);
  };

  return (
    <div className="options-dd-box">
      {page === 1 && (
        <>
          <div className="options-dd-head">
            <form
              className="options-dd-head-section1"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="options-dd-name-input"
                onFocus={() => {
                  setNameFocus(true);
                }}
                onBlur={() => {
                  setNameFocus(false);
                  handleUpdate();
                }}
                disabled={updating}
              ></input>
              {!nameFocus && !updating && <PencilIcon />}
              {updating && <SpinLoader height={16} width={16} color="black" />}
            </form>
            {folder && (
              <div className="options-dd-head-section2">
                <FolderIcon />
                {folder.name}
              </div>
            )}
          </div>
          <div className="options-dd-body">
            <div
              className="options-dd-item"
              onClick={() => {
                setPage(2);
              }}
            >
              <div className="options-dd-item-icon">
                <FolderIcon />
              </div>
              <div className="options-dd-item-text">Move to folder</div>
              <div className="options-dd-right">
                <RightArrowIcon />
              </div>
            </div>
            {/* <div className="options-dd-item">
          <div className="options-dd-item-icon">
          <DownloadIcon />
          </div>
          <div className="options-dd-item-text">Download</div>
          <div className="options-dd-right">
          <RightArrowIcon />
          </div>
        </div> */}
            <div className="options-dd-item" onClick={handleDelete}>
              <div className="options-dd-item-icon">
                {deleting && (
                  <SpinLoader height={18} width={18} color={"black"} />
                )}
                {!deleting && <TrashIcon />}
              </div>
              <div className="options-dd-item-text">Move to trash</div>
            </div>
          </div>
        </>
      )}
      {page === 2 && (
        <div className="options-dd-page2">
          <div className="options-dd-page2-head">
            <div
              className="options-dd-back-btn"
              onClick={() => {
                setPage(1);
              }}
            >
              <LeftArrowIcon />
            </div>
            Move to folder
          </div>
          {folders.filter((x) => x._id !== upload.folder._id).length === 0 && (
            <div className="options-dd-page2-empty-body">
              <img
                src="https://static.canva.com/web/images/b8377ddee434518b82bb74d3d13e31bd.png"
                alt=""
                style={{
                  height: "30%",
                }}
              ></img>
              <div style={{ fontSize: "smaller" }}>No Folders to move</div>
            </div>
          )}
          {folders.filter((x) => x._id !== upload.folder._id).length > 0 && (
            <div className="options-dd-page2-body">
              {folders
                .filter((x) => x._id !== upload.folder._id)
                .map((item, index) => (
                  <div
                    className="options-dd-item"
                    key={index}
                    onClick={() => {
                      setNewFolder(newFolder === item._id ? null : item._id);
                    }}
                    style={{
                      backgroundColor: item._id === newFolder && "#8b3dff",
                      color: item._id === newFolder && "white",
                    }}
                  >
                    <div className="options-dd-item-icon">
                      <FolderIcon />
                    </div>
                    <div className="options-dd-item-text">{item.name}</div>
                  </div>
                ))}
            </div>
          )}
          <div className="options-dd-page2-foot">
            <button
              className="create-new-folder-btn"
              style={{ padding: "0px" }}
            >
              <AddNewBtn />
            </button>
            <button
              className="move-to-folder-btn"
              disabled={!newFolder}
              onClick={handleMoveToFolder}
            >
              {moving ? (
                <SpinLoader height={18} width={18} color={"white"} />
              ) : (
                "Move to folder"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddNewBtn() {
  const [folderModal, setFolderModal] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        background: "red",
        padding: "0px 5px",
        borderRadius: "5px",
        backgroundColor: "whitesmoke",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={() => {
          setFolderModal(true);
        }}
      >
        Create New
      </div>
      {folderModal && <NewFolderModal setFolderModal={setFolderModal} />}
    </div>
  );
}

function NewFolderModal({ setFolderModal }) {
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
