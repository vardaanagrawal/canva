import React, { useState } from "react";
import "./customSize.css";
import {
  DocumentIcon,
  MobileIcon,
  PresentationIcon,
} from "../../../../utils/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewProject } from "../../../../redux/actions/x2ProjectsActions";
import SpinLoader from "../../../../utils/SpinLoader";

const dimensionLimit = {
  px: { min: 40, max: 2000 },
  in: { min: 1, max: 21 },
  mm: { min: 11, max: 530 },
  cm: { min: 1, max: 53 },
};

const unitConv = {
  "cm-px": 38,
  "mm-px": 4,
  "in-px": 96,
  "cm-in": 0.394,
  "mm-in": 0.0394,
  "px-in": 0.010416,
  "cm-mm": 10,
  "px-mm": 0.265,
  "in-mm": 25.4,
  "px-cm": 0.026,
  "in-cm": 2.54,
  "mm-cm": 0.1,
};

const suggestedList = [
  {
    icon: <DocumentIcon />,
    name: "Document (Portrait)",
    height: 500,
    width: 350,
    bg_color: "white",
  },
  {
    icon: <MobileIcon />,
    name: "Instagram Post",
    height: 1080,
    width: 1080,
    bg_color: "white",
  },
  {
    icon: <PresentationIcon />,
    name: "Presentation (4:3)",
    height: 768,
    width: 1024,
    bg_color: "white",
  },
];

export default function CustomSize() {
  const [height, setHeight] = useState(40);
  const [width, setWidth] = useState(40);
  const [unit, setUnit] = useState("px");
  const [err, setErr] = useState(false);

  function isValidDimension(width, height) {
    if (
      width >= dimensionLimit[unit].min &&
      width <= dimensionLimit[unit].max &&
      height >= dimensionLimit[unit].min &&
      height <= dimensionLimit[unit].max
    )
      return true;
    else return false;
  }

  async function handleCreate() {
    if (!isValidDimension(width, height)) {
      setErr(true);
    } else {
      setErr(false);
      setLoading(true);
      const newProjectData = {
        height:
          unit === "px" ? height : Math.ceil(height * unitConv[`${unit}-px`]),
        width:
          unit === "px" ? width : Math.ceil(width * unitConv[`${unit}-px`]),
        bg_color: "white",
      };
      await dispatch(createNewProject(newProjectData, navigate));
      setLoading(false);
    }
  }

  function handleUnitChange(oldUnit, newUnit) {
    setHeight(Math.ceil(height * unitConv[`${oldUnit}-${newUnit}`]));
    setWidth(Math.ceil(width * unitConv[`${oldUnit}-${newUnit}`]));
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sloading, setSLoading] = useState(-1);

  async function handleCreateSuggested(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
    };
    await dispatch(createNewProject(newProjectData, navigate));
    setSLoading(-1);
  }

  return (
    <div className="custom-size-box">
      <div className="custom-size-title">Create custom size design</div>
      <div className="custom-size-inputs">
        <div>Width</div>
        <div>Height</div>
        <div></div>
        <input
          type="number"
          value={width}
          onBlur={() => {
            if (width === "") setWidth(0);
          }}
          onChange={(e) => {
            setWidth(e.target.value);
            if (isValidDimension(e.target.value, height)) {
              setErr(false);
            }
          }}
        ></input>
        <input
          type="number"
          value={height}
          onBlur={() => {
            if (height === "") setHeight(0);
          }}
          onChange={(e) => {
            setHeight(e.target.value);
            if (isValidDimension(width, e.target.value)) {
              setErr(false);
            }
          }}
        ></input>
        <select
          value={unit}
          onChange={(e) => {
            handleUnitChange(unit, e.target.value);
            setUnit(e.target.value);
          }}
        >
          <option value="px">px</option>
          <option value="in">in</option>
          <option value="mm">mm</option>
          <option value="cm">cm</option>
        </select>
      </div>
      {err && (
        <div className="custom-size-err-box">
          Dimenstions must be at least {dimensionLimit[unit].min} {unit} and no
          more than {dimensionLimit[unit].max} {unit}
        </div>
      )}
      <div
        className={
          isValidDimension(width, height)
            ? "custom-size-create-btn"
            : "custom-size-create-btn custome-size-create-btn-disabled"
        }
        onClick={() => {
          handleCreate();
        }}
      >
        {!loading && "Create new design"}
        {loading && <SpinLoader height={18} width={18} color="white" />}
      </div>
      <div className="custom-suggested-box">
        <div className="custom-suggested-title">Suggested</div>
        {suggestedList.map((item, index) => (
          <div
            className="custom-suggested-item"
            onClick={() => {
              setSLoading(index);
              handleCreateSuggested(item);
            }}
          >
            {sloading !== index && (
              <div className="custom-suggested-item-icon">{item.icon}</div>
            )}
            {sloading === index && (
              <SpinLoader height={20} width={20} color="black" />
            )}
            <div className="custom-suggested-item-name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
