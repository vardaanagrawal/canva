import React from "react";
import { addComponent } from "../../../../redux/actions/currentProjectActions";
import { setSelectedComponent, updateSelectedComponent } from "../../../../redux/actions/selectedComponentActions";
import { useDispatch, useSelector } from "react-redux";
import { shapes } from "../utils";

export default function ShapeSidebar() {
  const dispatch = useDispatch();
  function addItem(item) {
    dispatch(addComponent(item));
    dispatch(setSelectedComponent(item));
  }

  const sidebar2 = useSelector((state) => state.sidebar2);
  const selected_component = useSelector((state) => state.selected_component);
  function handleClick(item) {
    if (sidebar2.mode === "new") {
      const id = Math.floor(Math.random() * 900) + 100;
      addItem({
        ...item,
        _id: id,
        component_type: 2,
        height: 100,
        width: 100,
        x: 100,
        y: 100,
      });
    } else {
      dispatch(
        updateSelectedComponent(selected_component._id, {
          shape_clip_path: item.shape_clip_path,
        })
      );
    }
  }
  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Shapes</div>
      <div className="sidebar2-body elements-sidebar-body">
        {shapes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(item);
            }}
            className="elements-sidebar-item"
          >
            <div
              className="elements-sidebar-element"
              style={{
                clipPath: item.shape_clip_path,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
