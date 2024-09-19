import React, { useEffect, useState } from "react";
import "./positionSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";
import { aligns } from "../../utils";
import { setSelectedComponent } from "../../../../../redux/actions/x6ComponentActions";

export default function PositionSidebar() {
  const [nav, setNav] = useState(0);

  return (
    <div className="elements-sidebar">
      <div className="elements-sidebar-title position-sidebar-title">
        <div
          className="position-sidebar-title-item"
          onClick={() => {
            setNav(0);
          }}
        >
          Arrange
        </div>
        <div
          className="position-sidebar-title-item"
          onClick={() => {
            setNav(1);
          }}
        >
          Layers
        </div>
        <div
          className="position-sidebar-title-marker"
          style={{
            left: nav === 0 ? "15px" : "50%",
          }}
        ></div>
      </div>
      {nav == 0 && (
        <div className="sidebar2-body sidebar2-arrange-body">
          <Arrange />
        </div>
      )}
      {nav == 1 && (
        <div className="sidebar2-body sidebar2-layers-body">
          <Layers />
        </div>
      )}
    </div>
  );
}

function Arrange() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".arrange-body").style.left = 0;
      document.querySelector(".arrange-body").style.opacity = 1;
    }, 10);
  }, []);

  const component = useSelector((state) => state.component);
  const [height, setHeight] = useState(component.height || 0);
  const [width, setWidth] = useState(component.width || 0);
  const [x, setX] = useState(component.x || 0);
  const [y, setY] = useState(component.y || 0);
  const [flag, setFlag] = useState(1);
  useEffect(() => {
    setHeight(component.height ? component.height : 0);
    setWidth(component.width ? component.width : 0);
    setX(component.x ? component.x : 0);
    setY(component.y ? component.y : 0);
    setFlag(1);
  }, [component]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      component.component_type !== "body" &&
      component.component_type !== "page" &&
      !flag
    ) {
      if (
        component.height !== height ||
        component.width !== width ||
        component.x !== x ||
        component.y !== y
      ) {
        const index = components.findIndex((obj) => obj._id === component._id);
        dispatch(
          manageElement({
            action: "update",
            element: "component",
            prev_state: components[index],
            new_state: {
              ...components[index],
              height,
              width,
              x,
              y,
            },
          })
        );
      }
    }
  }, [height, width, x, y]);

  const canvas = useSelector((state) => state.page);

  const components = useSelector((state) => state.page.components);

  const [alignDisabled, setAlignDisabled] = useState(true);
  const [hwDisabled, setHwDisabled] = useState(true);
  const [xyDisabled, setXyDisabled] = useState(true);

  useEffect(() => {
    if (component.component_type === "body") {
      setAlignDisabled(true);
      setHwDisabled(true);
      setXyDisabled(true);
    } else if (component.component_type === "page") {
      setAlignDisabled(true);
      setHwDisabled(true);
      setXyDisabled(true);
    } else {
      setAlignDisabled(false);
      setHwDisabled(false);
      setXyDisabled(false);
    }
  }, [component]);

  const m = {
    Top: {
      x: x,
      y: 0,
    },
    Left: {
      x: 0,
      y: y,
    },
    Middle: {
      x: x,
      y: Math.floor(canvas.height / 2 - height / 2),
    },
    Center: {
      x: Math.floor(canvas.width / 2 - width / 2),
      y: y,
    },
    Bottom: {
      x: x,
      y: Math.floor(canvas.height - height),
    },
    Right: {
      x: Math.floor(canvas.width - width),
      y: y,
    },
  };

  function handleAlign(align) {
    setFlag(0);
    setX(m[align].x);
    setY(m[align].y);
  }

  return (
    <div className="arrange-body">
      <div className="position-sidebar-body-item">
        <div className="position-sidebar-mini-title">Align to page</div>
        <div className="position-sidebar-align">
          {aligns.map((item, index) => (
            <div
              key={index}
              className={`position-sidebar-align-item ${
                alignDisabled && "position-align-item-disabled"
              }`}
              onClick={() => handleAlign(item.name)}
            >
              {item.icon}
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="position-sidebar-body-item">
        <div className="position-sidebar-mini-title">Advanced</div>
        <div className="position-sidebar-advanced">
          <div className="position-sidebar-advanced-item">
            <div
              className={`position-sidebar-advanced-label ${
                hwDisabled && "position-advanced-disabled"
              }`}
            >
              Height
            </div>
            <input
              type={hwDisabled ? "text" : "Number"}
              className={`position-sidebar-advanced-input ${
                hwDisabled && "position-advanced-input-disabled"
              }`}
              disabled={hwDisabled}
              value={hwDisabled ? "--" : height}
              onChange={(e) => {
                if (!hwDisabled) {
                  setHeight(e.target.value >= 5 ? e.target.value : 5);
                  setFlag(0);
                }
              }}
            ></input>
          </div>
          <div className="position-sidebar-advanced-item">
            <div
              className={`position-sidebar-advanced-label ${
                hwDisabled && "position-advanced-disabled"
              }`}
            >
              Width
            </div>
            <input
              type={hwDisabled ? "text" : "Number"}
              className={`position-sidebar-advanced-input ${
                hwDisabled && "position-advanced-input-disabled"
              }`}
              disabled={hwDisabled}
              value={hwDisabled ? "--" : width}
              onChange={(e) => {
                if (!hwDisabled) {
                  setWidth(e.target.value >= 5 ? e.target.value : 5);
                  setFlag(0);
                }
              }}
            ></input>
          </div>
          <div className="position-sidebar-advanced-item">
            <div
              className={`position-sidebar-advanced-label ${
                xyDisabled && "position-advanced-disabled"
              }`}
            >
              X
            </div>
            <input
              type={xyDisabled ? "text" : "Number"}
              className={`position-sidebar-advanced-input ${
                xyDisabled && "position-advanced-input-disabled"
              }`}
              disabled={xyDisabled}
              value={xyDisabled ? "--" : x}
              onChange={(e) => {
                if (!xyDisabled) {
                  setX(e.target.value);
                  setFlag(0);
                }
              }}
            ></input>
          </div>
          <div className="position-sidebar-advanced-item">
            <div
              className={`position-sidebar-advanced-label ${
                xyDisabled && "position-advanced-disabled"
              }`}
            >
              Y
            </div>
            <input
              type={xyDisabled ? "text" : "Number"}
              className={`position-sidebar-advanced-input ${
                xyDisabled && "position-advanced-input-disabled"
              }`}
              disabled={xyDisabled}
              value={xyDisabled ? "--" : y}
              onChange={(e) => {
                if (!xyDisabled) {
                  setY(e.target.value);
                  setFlag(0);
                }
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

function Layers() {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".layers-body").style.right = 0;
      document.querySelector(".layers-body").style.opacity = 1;
    }, 10);
  }, []);

  const components = useSelector((state) => state.page.components);
  const dispatch = useDispatch();
  function handleMoveAbove(index) {
    const zIndex1 = components[index].zIndex;
    const zIndex2 = components[index - 1].zIndex;
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        prev_state: components[index - 1],
        new_state: {
          _id: components[index - 1]._id,
          zIndex: zIndex1,
        },
      })
    );
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        prev_state: components[index],
        new_state: {
          _id: components[index]._id,
          zIndex: zIndex2,
        },
      })
    );
  }
  function handleMoveBehind(index) {
    const zIndex1 = components[index].zIndex;
    const zIndex2 = components[index + 1].zIndex;
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        prev_state: components[index + 1],
        new_state: {
          _id: components[index + 1]._id,
          zIndex: zIndex1,
        },
      })
    );
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        prev_state: components[index],
        new_state: {
          _id: components[index]._id,
          zIndex: zIndex2,
        },
      })
    );
  }

  const component = useSelector((state) => state.component);
  const canvas = useSelector((state) => state.page);

  return (
    <div className="layers-body">
      <div
        className="position-sidebar-body-item"
        style={{ borderBottom: "none", padding: "15px" }}
      >
        <div className="position-sidebar-layers">
          {components
            .sort(function (a, b) {
              return b.zIndex - a.zIndex;
            })
            .map((item, index) => (
              <div
                key={index}
                className="layers-sidebar-item"
                onClick={() => {
                  dispatch(setSelectedComponent(item));
                }}
                style={{
                  outline: component._id === item._id && "solid 1px #8b3dff",
                  border: component._id === item._id && "solid 1px #8b3dff",
                }}
              >
                {item.component_type === "shape" && (
                  <div
                    style={{
                      height: "40px",
                      width: (40 / item.height) * item.width,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      height="100%"
                      width="100%"
                    >
                      <path
                        d={item.svg}
                        fill={item.color}
                        stroke={item.border_color}
                        strokeWidth={item.border_width}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                )}
                {item.component_type === "text" && (
                  <div
                    style={{
                      height: "40px",
                      width: "70%",
                      textAlign: "center",
                      lineHeight: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: item.color,
                      fontFamily: item.font_family,
                    }}
                  >
                    {item.text}
                  </div>
                )}
                {item.component_type === "image" && (
                  <div
                    style={{
                      height: "50px",
                      width: "auto",
                      maxWidth: "70%",
                      aspectRatio: item.width / item.height,
                    }}
                  >
                    <img
                      src={item.image_url}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    ></img>
                  </div>
                )}
                <button
                  className="move-up-btn"
                  disabled={index === 0}
                  onClick={() => {
                    handleMoveAbove(index);
                  }}
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </button>
                <button
                  className="move-down-btn"
                  disabled={index === components.length - 1}
                  onClick={() => {
                    handleMoveBehind(index);
                  }}
                >
                  <i className="fa-solid fa-arrow-down"></i>
                </button>
              </div>
            ))}
          <div
            className="layers-sidebar-item"
            onClick={() => {
              dispatch(setSelectedComponent(canvas));
            }}
            style={{
              outline: component._id === canvas._id && "solid 1px #8b3dff",
              border: component._id === canvas._id && "solid 1px #8b3dff",
            }}
          >
            <div
              style={{
                height: "50px",
                width: "70%",
                aspectRatio: canvas.width / canvas.height,
                background: canvas.color,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
