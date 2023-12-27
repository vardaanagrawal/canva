import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentProject,
  updateProjectName,
} from "../../../redux/actions/currentProjectActions";
import { saveProject } from "../../../api";

export default function Navbar() {
  const currentProject = useSelector((state) => state.current_project);

  const [name, setName] = useState(currentProject.name);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateProjectName(name));
  }, [name]);

  async function save() {
    console.log(currentProject);
    const res = await saveProject(currentProject);
    console.log("saved: ", res);
    dispatch(updateCurrentProject(res.project));
  }

  return (
    <div className="design-navbar">
      <div className="dn-left-menu">
        <div className="dn-sidebar-menu-btn">
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="dn-title">
          <input
            placeholder="Untitled Design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="dn-right-menu">
        <div
          className="dn-save-btn"
          onClick={() => {
            save();
          }}
        >
          Save
        </div>
        <div className="dn-share-btn">Share</div>
      </div>
    </div>
  );
}
