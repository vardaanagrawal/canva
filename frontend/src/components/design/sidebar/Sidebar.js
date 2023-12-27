import React from "react";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { addComponent } from "../../../redux/actions/currentProjectActions";
import {
  setSelectedComponent,
  updateSelectedComponent,
} from "../../../redux/actions/selectedComponentActions";
import { showSidebar2 } from "../../../redux/actions/sidebar2Actions";

import {
  items,
  shapes,
  font_styles,
  images,
  colors,
  gradient_colors,
} from "./utils";
import ShapeSidebar from "./sidebars/ShapeSidebar";
import TextSidebar from "./sidebars/TextSidebar";
import ImageSidebar from "./sidebars/ImageSidebar";
import ColorSidebar from "./sidebars/ColorSidebar";
import PositionSidebar from "./sidebars/PositionSidebar";
import NoteSidebar from "./sidebars/NoteSidebar";

export default function Sidebar() {
  const sidebar2 = useSelector((state) => state.sidebar2);
  const dispatch = useDispatch();

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
              dispatch(
                showSidebar2({
                  visible: true,
                  type: item.type,
                  mode: "new",
                })
              );
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

  function addItem(item) {
    dispatch(addComponent(item));
    dispatch(setSelectedComponent(item));
  }

  const selected_component = useSelector((state) => state.selected_component);

  return (
    <div className="sidebar2">
      {sidebar2.type == "shapes" ? (
        <ShapeSidebar />
      ) : sidebar2.type == "text" ? (
        <TextSidebar />
      ) : sidebar2.type == "images" ? (
        <ImageSidebar />
      ) : sidebar2.type === "color" ? (
        <ColorSidebar />
      ) : sidebar2.type === "position" ? (
        <PositionSidebar />
      ) : (
        sidebar2.type === "notes" && <NoteSidebar />
      )}

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
