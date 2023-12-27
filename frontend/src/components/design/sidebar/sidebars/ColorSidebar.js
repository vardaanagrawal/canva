import React from "react";
import { colors, gradient_colors } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedComponent } from "../../../../redux/actions/selectedComponentActions";
import { updateCanvasData } from "../../../../redux/actions/currentProjectActions";

export default function ColorSidebar() {
  const selected_component = useSelector((state) => state.selected_component);
  const dispatch = useDispatch();

  function handleClick(color) {
    if (selected_component.component_type == 1) {
      dispatch(
        updateCanvasData({
          bg_color: color,
        })
      );
    } else if (selected_component.component_type == 2) {
      dispatch(
        updateSelectedComponent(selected_component._id, {
          shape_bg_color: color,
        })
      );
    } else if (selected_component.component_type == 3) {
      dispatch(
        updateSelectedComponent(selected_component._id, {
          font_color: color,
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
