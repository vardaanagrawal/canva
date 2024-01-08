import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import ProjectCard from "../../utlis/projectCard/ProjectCard";
import SpinLoader from "../../../utils/spinLoader/SpinLoader";
// functions
import { createNewProject } from "../../../../redux/actions/x2ProjectsActions";
import { newProjectsList, projectCategories } from "./utils";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector((state) => state.projects);
  const [loading, setLoading] = useState(-1);

  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
    };
    await dispatch(createNewProject(newProjectData, navigate));
    setLoading(-1);
  }

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

  return (
    <div className="home">
      {/* ================================================================================ */}
      <div className="home-blue-box">
        <div>
          <div className="blue-box-top">
            {/* <button>Custom Size</button>
            <button>Upload</button> */}
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
      <div className="home-item-head">Create New Project</div>
      <div className="home-item">
        <div className="home-item-body">
          {projectList.map((item, index) => (
            <div className="home-project-item" key={index}>
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
                  src={item.thumbnail}
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
                      backgroundColor: "#11111180",
                      position: "absolute",
                    }}
                  >
                    <SpinLoader height={30} width={30} color={"white"} />
                  </div>
                )}
              </div>
              <div className="home-project-item-name">{item.name}</div>
              <div className="home-project-item-dimension">
                {item.width} X {item.height}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-item-head">Recent Projects</div>
      <div className="home-item">
        {projects.length === 0 && (
          <div className="no-project-box">
            <img
              src="https://static.canva.com/web/images/1d5a272ab76b3d9d708b6e7bf3142da3.png"
              alt=""
            ></img>
            <div>Designs you create will be shown here.</div>
          </div>
        )}
        {projects.length > 0 && (
          <div className="home-item-body">
            {projects.slice(0, 5).map((item) => (
              <div className="home-project-item" key={item._id}>
                <ProjectCard project={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
