import React, { useEffect, useState } from "react";
import "./design.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// components
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Canvas from "./canvas/Canvas";

// functions
import { getProject } from "../../redux/actions/x5ProjectActions";
import SpinLoader from "../../utils/SpinLoader";
import GridView from "./gridView/GridView";

export default function Design() {
  const dispatch = useDispatch();
  const location = useLocation();

  // fetching project id from url and finding it in database
  useEffect(() => {
    setLoading(true);
    const projectId = location.pathname.split("/")[2];
    async function fetchProjectDetails() {
      // fetching project details
      const res = await dispatch(getProject(projectId));
      setLoading(false);
      // if project is found data is updated in redux
      if (res.success) {
        setErr(false);
      }
      // else user is resirected to home page
      else {
        setErrType(res.message);
      }
    }
    fetchProjectDetails();
  }, [location]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(true);
  const [errType, setErrType] = useState("");

  const project = useSelector((state) => state.project);
  
  useEffect(() => {
    if (project._id)
      document.title = project.name + " - " + project.project_type;
    else document.title = "Canva";
  }, [project]);

  const designView = useSelector((state) => state.designView);

  if (loading) {
    return <Loading />;
  } else if (err) {
    if (errType === "not authorized") return <NotAuthorized />;
    else return <NotFound />;
  } else
    return (
      <div className="design">
        <Navbar />
        {designView === "page" && (
          <div className="workArea">
            <div className="sidebar-container">
              <Sidebar />
            </div>
            <Canvas />
          </div>
        )}
        {designView === "grid" && <GridView />}
      </div>
    );
}

function Loading() {
  return (
    <div
      className="loading"
      style={{ height: "100vh", display: "grid", placeItems: "center" }}
    >
      <SpinLoader height={40} width={40} color={"black"} />
    </div>
  );
}

function NotFound() {
  return (
    <div className="project-not-found-page">
      <div className="logo">
        <img src="https://static.canva.com/static/images/canva_logo.svg"></img>
      </div>
      <div className="one">Not found (404)</div>
      <div className="two">
        Sorry, the page you are looking for does not exist.
      </div>
      <Link to="/">Go back to the Canva homepage</Link>
    </div>
  );
}

function NotAuthorized() {
  return (
    <div className="project-not-found-page">
      <div className="logo">
        <img src="https://static.canva.com/static/images/canva_logo.svg"></img>
      </div>
      <div className="one">Not authorized (401)</div>
      <div className="two">Sorry, you don't have the access to edit.</div>
      <Link to="/">Go back to the Canva homepage</Link>
    </div>
  );
}
