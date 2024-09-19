import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import ProjectCard, { ProjectsList } from "../../utlis/projectCard/ProjectCard";
import SpinLoader from "../../../../utils/SpinLoader";
import CustomSize from "../../utlis/customSize/CustomSize";
// functions
import { createNewProject } from "../../../../redux/actions/x2ProjectsActions";
import { uploadImage } from "../../../../redux/actions/x4UploadsActions";
// utils
import {
  newProjectsList,
  projectCategories,
  projectCategoryTitles,
} from "../../../../utils/utils";
import {
  CustomSizeIcon,
  GridViewIcon,
  ListViewIcon,
  UploadIcon,
} from "../../../../utils/icons";

export default function Home() {
  const projects = useSelector((state) => state.projects);
  // =======================================================================================
  const [hover, setHover] = useState(""); // for project category buttons
  const [projectCategory, setProjectCategory] = useState("For You");
  const [projectList, setProjectList] = useState(
    [].concat(...Object.values(newProjectsList))
  );
  useEffect(() => {
    if (projectCategory === "For You") {
      setProjectList([].concat(...Object.values(newProjectsList)));
    } else {
      setProjectList(newProjectsList[projectCategory]);
    }
  }, [projectCategory]);
  // =======================================================================================

  const [customDd, setCustomDd] = useState(false);
  const cbRef = useRef(null);
  const cdRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      cdRef.current && // tells us that whether the custom dropdown  is open or not
      !cdRef.current.contains(event.target) && // tells us whether clicked item is custom dropdown or not
      !cbRef.current.contains(event.target) // tells us whether clicked item is custom button or not
    ) {
      setCustomDd(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState();

  const user = useSelector((state) => state.user);
  async function handleUpload(imgFile) {
    setUploading(true);
    const res = await dispatch(uploadImage(user._id, imgFile));
    navigate("/projects?content=uploads");
    setUploading(false);
  }

  const [view, setView] = useState("grid");

  return (
    <div className="home">
      {/* ================================================================================ */}
      <div className="home-blue-box">
        <div>
          <div className="blue-box-top">
            <input
              type="file"
              id="blue-box-upload-btn"
              style={{ display: "none" }}
              onChange={(e) => {
                handleUpload(e.target.files[0]);
              }}
            ></input>
            <label htmlFor="blue-box-upload-btn">
              {uploading ? (
                <SpinLoader height={18} width={18} color="white" />
              ) : (
                <UploadIcon />
              )}
            </label>
            <label
              ref={cbRef}
              onClick={() => {
                setCustomDd(!customDd);
              }}
            >
              <CustomSizeIcon />
            </label>
            {customDd && (
              <div className="blue-box-custom-dd" ref={cdRef}>
                <CustomSize />
              </div>
            )}
          </div>
          <div className="blue-box-title">What will you design today?</div>
        </div>
        <div className="blue-box-items">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(5, 1fr)`,
              gap: "3vw",
              margin: "auto",
            }}
          >
            {projectCategories.map((item, index) => (
              <div
                key={index}
                className="blue-box-btn"
                onClick={() => {
                  setProjectCategory(item.name);
                }}
                onMouseEnter={() => {
                  setHover(item.name);
                }}
                onMouseLeave={() => {
                  setHover("");
                }}
              >
                <div
                  className="blue-box-btn-img"
                  style={{
                    color:
                      projectCategory === item.name || hover === item.name
                        ? "white"
                        : item.color,
                    backgroundColor:
                      projectCategory === item.name || hover === item.name
                        ? item.color
                        : "white",
                  }}
                >
                  {item.img}
                </div>
                <div className="blue-box-btn-text">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================================================================================ */}
      <div className="home-item-head">
        {projectCategoryTitles[projectCategory]}
      </div>
      <div className="home-item">
        <div className="home-item-body">
          {projectList.map((item, index) => (
            <NewProjectCard item={item} index={index} key={index} />
          ))}
        </div>
      </div>
      {/* ================================================================================ */}
      <div className="home-item-head">
        <div>Your designs</div>
        <div
          className="view-toggle-btn"
          onClick={() => {
            setView(view === "grid" ? "list" : "grid");
          }}
        >
          {view === "grid" && <ListViewIcon />}
          {view === "list" && <GridViewIcon />}
        </div>
      </div>
      {projects.length === 0 && (
        <div className="no-project-box">
          <img
            src="https://static.canva.com/web/images/1d5a272ab76b3d9d708b6e7bf3142da3.png"
            alt=""
          ></img>
          <div>Designs you create will be shown here.</div>
        </div>
      )}
      {projects.length > 0 && view === "grid" && (
        <div className="home-recent-item-grid">
          {projects.map((item) => (
            <ProjectCard project={item} key={item._id} />
          ))}
        </div>
      )}
      {projects.length > 0 && view === "list" && (
        <div className="home-recent-item-list">
          <ProjectsList />
        </div>
      )}
    </div>
  );
}

function NewProjectCard({ item, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(-1);

  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
      project_type: item.name,
      thumbnail: item.thumbnail,
    };
    await dispatch(createNewProject(newProjectData, navigate));
    setLoading(-1);
  }
  return (
    <div className="home-project-item">
      <div
        className="home-project-item-img"
        onClick={() => {
          if (loading === -1) {
            setLoading(index);
            handleCreateNewProject(item);
          }
        }}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img
          src={item.poster}
          alt=""
          style={{ height: "100%", width: "100%" }}
        ></img>
        {loading === index && (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              position: "absolute",
              backdropFilter: "blur(3px)",
            }}
          >
            <SpinLoader height={30} width={30} color={"white"} />
          </div>
        )}
        {loading === -1 && (
          <div className="home-project-item-hover">Create blank</div>
        )}
      </div>
      <div className="home-project-item-name">{item.name}</div>
      <div className="home-project-item-dimension">
        {item.width} X {item.height}
      </div>
    </div>
  );
}
