import React, { useEffect, useState } from "react";
import "./design.css";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Canvas from "./canvas/Canvas";
import { getProjectDetails } from "../../api";
import { updateCurrentProject } from "../../redux/actions/currentProjectActions";

export default function Design() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // fetching project id from url and finding it in database
  useEffect(() => {
    const url = window.location.href;
    const projectId = url.split("/")[4];
    fetchProjectDetails(projectId);
  }, []);

  async function fetchProjectDetails(projectId) {
    // fetching project details
    const res = await getProjectDetails(projectId, user._id);
    // if project is found data is updated in redux
    if (res.success) dispatch(updateCurrentProject(res.project));
    // else user is resirected to home page
    else {
      if (res.status === 404) {
        window.alert(res.message);
      } else if (res.status === 401) {
        setNotFound(false);
        window.alert(res.message);
      } else {
        setNotFound(false);
        window.alert(res.message);
      }
      setLoading(false);
    }
  }

  const currentProject = useSelector((state) => state.current_project);
  const [loading, setLoading] = useState(true);
  const [notAuthorized, setNotAuthorized] = useState(true);
  const [notFound, setNotFound] = useState(true);
  useEffect(() => {
    if (currentProject._id) {
      setLoading(false);
      setNotAuthorized(false);
      setNotFound(false);
    }
  }, [currentProject]);

  if (loading) {
    return "Loading";
  } else if (notFound) {
    return "Not Found";
  } else if (notAuthorized) {
    return "Not Authorized";
  } else
    return (
      <div className="design">
        <Navbar />
        <div className="workArea">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <Canvas />
        </div>
      </div>
    );
}
