import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpinLoader from "../../../../utils/SpinLoader";
import { saveProject } from "../../../../redux/actions/x5ProjectActions";

import domtoimage from "dom-to-image";

export default function HomeBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [homing, setHoming] = useState(false);
  // function of home button ---------------------------------------------------------------
  const handleHome = async () => {
    setHoming(true);
    const canvas = document.querySelector(".page-container");
    domtoimage
      .toPng(canvas)
      .then(async function (dataUrl) {
        await dispatch(saveProject(dataUrl, project));
        setHoming(false);
        navigate("/");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div className="dn-home-btn" onClick={handleHome}>
      {homing && <SpinLoader height={20} width={20} color="white" />}
      {!homing && "Home"}
    </div>
  );
}
