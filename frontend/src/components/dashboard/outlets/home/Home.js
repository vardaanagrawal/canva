import React, { useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewProject } from "../../../../redux/actions/projectActions";
import ProjectCard from "../../utlis/projectCard/ProjectCard";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../../../utils/spinLoader/SpinLoader";

const newProjectsList = [
  {
    name: "Document (Landscape)",
    height: 400,
    width: 800,
    bg_color: "#ffffff",
  },
  {
    name: "Document (Portrait)",
    height: 500,
    width: 350,
    bg_color: "#ffffff",
  },
  {
    name: "Document (Square)",
    height: 400,
    width: 400,
    bg_color: "#ffffff",
  },
];

export default function Home() {
  const projects = useSelector((state) => state.user.projects).sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  const [loading, setLoading] = useState(-1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
    };
    dispatch(createNewProject(newProjectData, navigate, setLoading));
  }

  return (
    <div className="home">
      <div className="home-item-head">Create New Project</div>
      <div className="home-item">
        <div className="home-item-body">
          {newProjectsList.map((item, index) => (
            <div className="home-project-item" key={index}>
              <div
                className="home-project-item-img"
                onClick={() => {
                  if (loading===-1) {
                    setLoading(index);
                    handleCreateNewProject(item);
                  }
                }}
                style={{ position: "relative" }}
              >
                <div
                  className="home-project-item-img-canvas"
                  style={{
                    height:
                      item.height >= item.width
                        ? "100px"
                        : `${(180 * item.height) / item.width}px`,
                    width:
                      item.height >= item.width
                        ? `${(100 * item.width) / item.height}px`
                        : "180px",
                  }}
                ></div>
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
