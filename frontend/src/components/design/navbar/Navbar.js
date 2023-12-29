import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  manageElement, // used for undo redo actions
  updateCurrentProject, // used while saving the project
  updateProjectName, // used while changing the name of the project
} from "../../../redux/actions/currentProjectActions";
import { saveProject } from "../../../api";
import { setSelectedComponent } from "../../../redux/actions/selectedComponentActions";

export default function Navbar() {
  const currentProject = useSelector((state) => state.current_project);
  const [name, setName] = useState(currentProject.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateProjectName(name));
  }, [name]);

  // function to save changes of project in database
  async function save() {
    const res = await saveProject(currentProject);
    // updating the project details in redux
    dispatch(updateCurrentProject(res.project));
  }

  // const state = useSelector((state) => state.undo);
  const undo = useSelector((state) => state.undo);
  // console.log("undo: ", undo);
  const redo = useSelector((state) => state.redo);
  // console.log("redo: ", redo);

  function handleUndo() {
    let undo_item = undo.pop();
    if (undo_item.action === "add") {
      dispatch(setSelectedComponent({ component_type: 0 }));
      dispatch(
        manageElement({
          action: "delete",
          element: undo_item.element,
          method: "undo",
          item: undo_item.item,
        })
      );
    } else if (undo_item.action === "delete") {
      dispatch(
        manageElement({
          action: "add",
          element: undo_item.element,
          method: "undo",
          item: undo_item.item,
        })
      );
    } else if (undo_item.action === "update") {
      let new_state = undo_item.new_state;
      let prev_state = undo_item.prev_state;
      dispatch(
        manageElement({
          action: undo_item.action,
          element: undo_item.element,
          method: "undo",
          new_state: prev_state,
          prev_state: new_state,
        })
      );
    }
  }

  function handleRedo() {
    let redo_item = redo.pop();
    // let redo_item = {};
    if (redo_item.action === "add") {
      dispatch(
        manageElement({
          action: "delete",
          element: redo_item.element,
          method: "redo",
          item: redo_item.item,
        })
      );
    } else if (redo_item.action === "delete") {
      dispatch(
        manageElement({
          action: "add",
          element: redo_item.element,
          method: "redo",
          item: redo_item.item,
        })
      );
    } else if (redo_item.action === "update") {
      let new_state = redo_item.new_state;
      let prev_state = redo_item.prev_state;
      dispatch(
        manageElement({
          action: redo_item.action,
          element: redo_item.element,
          method: "redo",
          new_state: prev_state,
          prev_state: new_state,
        })
      );
    }
  }

  return (
    <div className="design-navbar">
      {/* ######################################################################################## */}
      <div className="dn-left-menu">
        <div className="dn-title">
          <input
            placeholder="Untitled Design"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="undo-redo-btns">
          <div
            className="undo-btn"
            onClick={() => {
              if (undo.length) handleUndo();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill={undo.length ? "white" : "silver"}
                d="m6.05 7.25 2.22-2.22A.75.75 0 0 0 7.2 3.97L4.43 6.75c-.69.68-.69 1.8 0 2.48l2.83 2.83A.75.75 0 0 0 8.32 11L6.07 8.75H16a4.25 4.25 0 1 1 0 8.5h-4a.75.75 0 1 0 0 1.5h4a5.75 5.75 0 0 0 0-11.5H6.05z"
              ></path>
            </svg>
          </div>
          <div
            className="redo-btn"
            onClick={() => {
              if (redo.length) handleRedo();
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={redo.length ? "white" : "silver"}
                d="m18.054 7.252-2.296-2.296a.75.75 0 0 1 1.06-1.06l2.83 2.828a1.75 1.75 0 0 1 0 2.475l-2.832 2.831a.75.75 0 0 1-1.06-1.06l2.219-2.22H8a4.25 4.25 0 0 0 0 8.5h4a.75.75 0 0 1 0 1.5H8a5.75 5.75 0 0 1 0-11.5h10c.018 0 .036 0 .054.002Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {/* ######################################################################################## */}
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
      {/* ######################################################################################## */}
    </div>
  );
}
