import React, { useEffect } from "react";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar2 } from "../../../../../redux/actions/x7Sidebar2Actions";

import { shapes } from "../../resources/shapes";

export default function ShapeSidebar() {
  const dispatch = useDispatch();
  const sidebar2 = useSelector((state) => state.sidebar2);
  const component = useSelector((state) => state.component);
  const components = useSelector((state) => state.components);

  function handleClick(item) {
    const index = components.findIndex((obj) => obj._id === component._id);
    // if shape of the selected shape is to be changed
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        prev_state: components[index],
        new_state: {
          ...components[index],
          svg: item.svg,
        },
      })
    );
  }

  useEffect(() => {
    if (sidebar2.type === "shapes" && component.component_type !== "shape") {
      dispatch(
        showSidebar2({
          visible: false,
        })
      );
    }
  }, [component]);

  return (
    <div className="elements-sidebar">
      <div className="elements-sidebar-title">Update Shape</div>
      <div
        className="shapes-sidebar-body"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "15px",
        }}
      >
        {shapes.map((item, index) => (
          <div
            onClick={() => {
              handleClick(item);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              height="100%"
              width="100%"
            >
              <path d={item.svg} fill={item.color} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
