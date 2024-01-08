import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageElement } from "../../../../redux/actions/x5ProjectActions";

export default function PositionSidebar() {
  const selected_component = useSelector((state) => state.component);
  const components = useSelector((state) => state.project.components);
  const [height, setHeight] = useState(selected_component.height);
  const [width, setWidth] = useState(selected_component.width);
  const [x, setX] = useState(selected_component.x);
  const [y, setY] = useState(selected_component.y);
  const [flag, setFlag] = useState(1);
  useEffect(() => {
    setHeight(selected_component.height ? selected_component.height : 0);
    setWidth(selected_component.width ? selected_component.width : 0);
    setX(selected_component.x ? selected_component.x : 0);
    setY(selected_component.y ? selected_component.y : 0);
    setFlag(1);
  }, [selected_component]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      selected_component.component_type !== 0 &&
      selected_component.component_type !== 1 &&
      !flag
    ) {
      const index = components.findIndex(
        (obj) => obj._id === selected_component._id
      );
      if (
        components[index].height !== height ||
        components[index].width !== width ||
        components[index].x !== x ||
        components[index].y !== y
      ) {
        dispatch(
          manageElement({
            action: "update",
            element: "component",
            method: "change",
            prev_state: components[index],
            new_state: {
              _id: components[index]._id,
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

  const canvas = useSelector((state) => state.project.canvas);

  const [alignDisabled, setAlignDisabled] = useState(true);
  const [hwDisabled, setHwDisabled] = useState(true);
  const [xyDisabled, setXyDisabled] = useState(true);

  useEffect(() => {
    if (selected_component.component_type === 0) {
      setAlignDisabled(true);
      setHwDisabled(true);
      setXyDisabled(true);
    } else if (selected_component.component_type === 1) {
      setAlignDisabled(true);
      setHwDisabled(true);
      setXyDisabled(true);
    } else {
      setAlignDisabled(false);
      setHwDisabled(false);
      setXyDisabled(false);
    }
  }, [selected_component]);

  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Arrange</div>
      <div className="sidebar2-body position-sidebar-body">
        <div className="position-sidebar-body-item">
          <div className="position-sidebar-mini-title">Align to page</div>
          <div className="position-sidebar-align">
            <div
              className={`position-sidebar-align-item ${
                alignDisabled && "position-align-item-disabled"
              }`}
              onClick={() => {
                if (!alignDisabled) {
                  setY(0);
                  setFlag(0);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 4c0 .41-.34.75-.75.75H3.75a.75.75 0 0 1 0-1.5h16.5c.41 0 .75.34.75.75zM11 9v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zm7 0v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zM9.5 9a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V9zm7 0a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V9z"
                ></path>
              </svg>
              Top
            </div>
            <div
              className={`position-sidebar-align-item ${
                alignDisabled && "position-align-item-disabled"
              }`}
              onClick={() => {
                if (!alignDisabled) {
                  setX(0);
                  setFlag(0);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 3c.41 0 .75.34.75.75v16.5a.75.75 0 1 1-1.5 0V3.75c0-.41.34-.75.75-.75zm5 3h9a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2zm0 7h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-1c0-1.1.9-2 2-2zm0-5.5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h9a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H9zm0 7a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H9z"
                ></path>
              </svg>
              Left
            </div>
            <div
              className={`position-sidebar-align-item ${
                alignDisabled && "position-align-item-disabled"
              }`}
              onClick={() => {
                if (!alignDisabled) {
                  setY(Math.floor(canvas.height / 2 - height / 2));
                  setFlag(0);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 11.25h2V7c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2v4.25h2.25a.75.75 0 1 1 0 1.5H18V17a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4.25h-2V14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1.25H3.75a.75.75 0 1 1 0-1.5H6V10c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2v1.25zM16.5 7a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V7zm-7 3a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-4z"
                ></path>
              </svg>
              Middle
            </div>
            <div
              className={`position-sidebar-align-item ${
                alignDisabled && "position-align-item-disabled"
              }`}
              onClick={() => {
                if (!alignDisabled) {
                  setX(Math.floor(canvas.width / 2 - width / 2));
                  setFlag(0);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11.25 13v-2H7a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h4.25V3.75a.75.75 0 1 1 1.5 0V6H17a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4.25v2H14a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1.25v2.25a.75.75 0 1 1-1.5 0V18H10a2 2 0 0 1-2-2v-1c0-1.1.9-2 2-2h1.25zM7 7.5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H7zm3 7a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h4a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-4z"
                ></path>
              </svg>
              Center
            </div>
            <div
              className={`position-sidebar-align-item ${
                alignDisabled && "position-align-item-disabled"
              }`}
              onClick={() => {
                if (!alignDisabled) {
                  setY(Math.floor(canvas.height - height));
                  setFlag(0);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 20c0 .41-.34.75-.75.75H3.75a.75.75 0 1 1 0-1.5h16.5c.41 0 .75.34.75.75zM11 6v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zm7 5v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zM9.5 6a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V6zm7 5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-4z"
                ></path>
              </svg>
              Bottom
            </div>
            <div
              className={`position-sidebar-align-item ${
                alignDisabled && "position-align-item-disabled"
              }`}
              onClick={() => {
                if (!alignDisabled) {
                  setX(Math.floor(canvas.width - width));
                  setFlag(0);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 3a.75.75 0 0 0-.75.75v16.5a.75.75 0 1 0 1.5 0V3.75A.75.75 0 0 0 20 3zm-5 3H6a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h9a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm0 7h-4a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2zm0-5.5c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V8c0-.28.22-.5.5-.5h9zm0 7c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1c0-.28.22-.5.5-.5h4z"
                ></path>
              </svg>
              Right
            </div>
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
                type="Number"
                className={`position-sidebar-advanced-input ${
                  hwDisabled && "position-advanced-input-disabled"
                }`}
                disabled={hwDisabled}
                value={height}
                onChange={(e) => {
                  if (!hwDisabled) {
                    if (selected_component.component_type === 2) {
                      setWidth(e.target.value);
                    }
                    setHeight(e.target.value);
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
                type="Number"
                className={`position-sidebar-advanced-input ${
                  hwDisabled && "position-advanced-input-disabled"
                }`}
                disabled={hwDisabled}
                value={width}
                onChange={(e) => {
                  if (!hwDisabled) {
                    if (selected_component.component_type === 2) {
                      setHeight(e.target.value);
                    }
                    setWidth(e.target.value);
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
                type="Number"
                className={`position-sidebar-advanced-input ${
                  xyDisabled && "position-advanced-input-disabled"
                }`}
                disabled={xyDisabled}
                value={x}
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
                type="Number"
                className={`position-sidebar-advanced-input ${
                  xyDisabled && "position-advanced-input-disabled"
                }`}
                disabled={xyDisabled}
                value={y}
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
    </div>
  );
}
