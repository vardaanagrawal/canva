import React, { useEffect, useState } from "react";
import "./design.css";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Canvas from "./canvas/Canvas";
import { getProjectDetails } from "../../api";
import { updateCurrentProject } from "../../redux/actions/currentProjectActions";

export default function Design() {
  useEffect(() => {
    const url = window.location.href;
    const projectId = url.split("/")[4];
    fetchProjectDetails(projectId);
  }, []);

  const dispatch = useDispatch();
  async function fetchProjectDetails(projectId) {
    const res = await getProjectDetails(projectId);
    if (res.success) dispatch(updateCurrentProject(res.project));
    else window.location.href = "/";
  }

  const currentProject = useSelector((state) => state.current_project);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentProject._id) {
      setLoading(false);
    }
  }, [currentProject]);

  return loading ? (
    "Loading"
  ) : (
    <div className="design">
      <Navbar />
      <div className="workArea">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="canvas-container">
          <Canvas />
        </div>
      </div>
    </div>
  );
}
