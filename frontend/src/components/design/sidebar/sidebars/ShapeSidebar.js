import React from "react";
import { manageElement } from "../../../../redux/actions/currentProjectActions";
import { setSelectedComponent } from "../../../../redux/actions/selectedComponentActions";
import { useDispatch, useSelector } from "react-redux";
import { shapes } from "../utils";

export default function ShapeSidebar() {
  const dispatch = useDispatch();
  const sidebar2 = useSelector((state) => state.sidebar2);
  const selected_component = useSelector((state) => state.selected_component);
  const components = useSelector((state) => state.current_project.components);

  function handleClick(item) {
    // if a new shape is to be added
    if (sidebar2.mode === "new") {
      // creating a temp id for the new shape
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
    }
    // if shape of the selected shape is to be changed
    else {
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
            shape_clip_path: item.shape_clip_path,
          },
        })
      );
    }
  }

  function addItem(item) {
    // adding the component in the components array of the current project
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        method: "change",
        item: item,
      })
    );
    // setting the newly added component as the selected component
    dispatch(setSelectedComponent(item));
  }

  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">
        {sidebar2.mode === "new" ? "Add New" : "Update"} Shape
      </div>
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
