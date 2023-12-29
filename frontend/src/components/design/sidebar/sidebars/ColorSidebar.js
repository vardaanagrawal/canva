import React from "react";
import { colors, gradient_colors } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { manageElement } from "../../../../redux/actions/currentProjectActions";

export default function ColorSidebar() {
  const selected_component = useSelector((state) => state.selected_component);
  const canvas = useSelector((state) => state.current_project.canvas);
  const components = useSelector((state) => state.current_project.components);
  const dispatch = useDispatch();

  function handleClick(color) {
    if (selected_component.component_type == 1) {
      dispatch(
        manageElement({
          action: "update",
          element: "canvas",
          method: "change",
          prev_state: canvas,
          new_state: {
            bg_color: color,
          },
        })
      );
    } else if (selected_component.component_type == 2) {
      const index = components.findIndex(
        (obj) => obj._id === selected_component._id
      );
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          method: "change",
          prev_state: components[index],
          new_state: {
            _id: components[index]._id,
            shape_bg_color: color,
          },
        })
      );
    } else if (selected_component.component_type == 3) {
      const index = components.findIndex(
        (obj) => obj._id === selected_component._id
      );
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          method: "change",
          prev_state: components[index],
          new_state: {
            _id: components[index]._id,
            font_color: color,
          },
        })
      );
    }
  }
  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Colors</div>
      <div className="sidebar2-body color-sidebar-body">
        {colors.map((item, index) => (
          <div
            className="color-sidebar-item"
            key={index}
            style={{
              backgroundColor: item,
            }}
            onClick={() => {
              handleClick(item);
            }}
          ></div>
        ))}
        {selected_component.component_type != 3 &&
          gradient_colors.map((item, index) => (
            <div
              className="color-sidebar-item"
              key={index}
              style={{
                background: item,
              }}
              onClick={() => {
                handleClick(item);
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}
