import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";

// functions
import {
  manageElement,
  saveProject,
} from "../../../redux/actions/x5ProjectActions";

// components
import SpinLoader from "../../../utils/SpinLoader";
import UndoRedo from "./utils/UndoRedo";
import File from "./utils/File";
import { SaveIcon } from "../../../utils/icons";
import LeftBarBtn from "./utils/LeftBarBtn";
import HomeBtn from "./utils/HomeBtn";

import domtoimage from "dom-to-image";
import Share from "./utils/Share";

export default function Navbar() {
  const dispatch = useDispatch();

  const project = useSelector((state) => state.project);
  const [name, setName] = useState(project.name);
  const [saving, setSaving] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setName(project.name);
  }, [project]);

  // function to save changes of project in database -------------------------------------
  const save = async () => {
    setSaving(true);
    const canvas = document.querySelector(".page-container");
    domtoimage
      .toPng(canvas)
      .then(async function (dataUrl) {
        console.log(project);
        await dispatch(saveProject(dataUrl, { ...project, owner: user }));
        setSaving(false);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  // function to update project name in redux state -------------------------------------
  function handleName() {
    document.querySelector(".design-project-name").blur();
    if (name.trim() === "") {
      setName("Untitled Project");
    }
    dispatch(
      manageElement({
        action: "update",
        element: "project",
        data: {
          _id: project._id,
          name: name,
        },
      })
    );
  }
  return (
    <div className="design-navbar">
      <div className="dn-left-menu">
        <LeftBarBtn />
        <HomeBtn />
        <File />
        <UndoRedo />
      </div>
      <div className="dn-right-menu">
        <div className="dn-title">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleName();
            }}
          >
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onBlur={() => handleName()}
              className="design-project-name"
            ></input>
          </form>
        </div>
        <div className="dn-save-btn" onClick={save}>
          {saving && <SpinLoader height={18} width={18} color="white" />}
          {!saving && <SaveIcon />}
          <div className="dn-save-btn-text">Save</div>
        </div>
        <Share />
      </div>
    </div>
  );
}
