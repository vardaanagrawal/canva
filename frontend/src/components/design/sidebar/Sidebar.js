import React from "react";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar2 } from "../../../redux/actions/sidebar2Actions";

import { items } from "./utils";

export default function Sidebar() {
  const sidebar2 = useSelector((state) => state.sidebar2);
  const dispatch = useDispatch();

  function handleClick(item) {
    if (sidebar2.visible && sidebar2.type === item.type) {
      dispatch(
        showSidebar2({
          visible: false,
        })
      );
    } else {
      dispatch(
        showSidebar2({
          visible: true,
          type: item.type,
          mode: "new",
        })
      );
    }
  }

  return (
    <div className="canvas-sidebar">
      <div className="sidebar1">
        {items.map((item, index) => (
          <div
            className={
              sidebar2.type === item.type && sidebar2?.mode === "new"
                ? "cs-item cs-item-selected"
                : "cs-item"
            }
            key={index}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>
      {sidebar2.visible && <Sidebar2 />}
    </div>
  );
}

function Sidebar2() {
  const sidebar2 = useSelector((state) => state.sidebar2);
  const dispatch = useDispatch();
  return (
    <div className="sidebar2">
      {sidebar2.component}
      <div
        className="sidebar2-close-btn"
        onClick={() => {
          dispatch(showSidebar2({ visible: false }));
        }}
      >
        {"<"}
      </div>
    </div>
  );
}
