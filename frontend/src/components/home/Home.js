import React, { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createNewProject } from "../../api";

const canvasList = [
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
    name: "Instagram Post",
    height: 400,
    width: 400,
    bg_color: "#ffffff",
  },
  {
    name: "Phone Wallpaper",
    height: 500,
    width: 300,
    bg_color: "#ffffff",
  },
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
    name: "Instagram Post",
    height: 400,
    width: 400,
    bg_color: "#ffffff",
  },
  {
    name: "Phone Wallpaper",
    height: 500,
    width: 300,
    bg_color: "#ffffff",
  },
];

export default function Home() {
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.user.projects);
  const [loading, setLoading] = useState(false);

  async function createNewPage(item) {
    setLoading(true);
    const res = await createNewProject({
      id: user._id,
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
    });
    if (res.success) {
      setLoading(false);
      window.location.href = `/design/${res.project_details._id}`;
    } else {
      alert(res.message);
    }
  }

  return (
    <div className="home">
      <div className="home-new-row-title">Create New</div>
      <div className="home-new-row">
        {canvasList.map((item, index) => (
          <div
            className="home-new-item"
            onClick={() => {
              createNewPage(item);
            }}
            key={index}
          >
            <div className="home-new-img"></div>
            <div className="home-new-text">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="home-projects-list-title">Recent Projects</div>
      <div className="projects-list">
        {projects.map((item) => (
          <Link
            to={`/design/${item._id}`}
            className="home-new-item"
            key={item._id}
          >
            <div className="home-new-img"></div>
            <div className="home-new-text">{item.name}</div>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="no-project-box">
            <img src="https://static.canva.com/web/images/1d5a272ab76b3d9d708b6e7bf3142da3.png"></img>
            <div>Designs you create will be shown here.</div>
          </div>
        )}
      </div>
      {loading && (
        <div className="loader-modal">
          <div className="loader-modal-box">Creating New Project...</div>
        </div>
      )}
    </div>
  );
}
