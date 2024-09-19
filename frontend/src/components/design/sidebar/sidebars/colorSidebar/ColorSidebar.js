import React, { useEffect, useRef, useState } from "react";
import "./colorSidebar.css";
import { colors, gradient_colors } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";
import { showSidebar2 } from "../../../../../redux/actions/x7Sidebar2Actions";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function ColorSidebar() {
  const component = useSelector((state) => state.component);
  const components = useSelector((state) => state.page.components);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      component.component_type === "image" ||
      component.component_type === "body"
    ) {
      dispatch(showSidebar2({ visible: false }));
    }
  }, [component]);

  function handleClick(color) {
    if (component.component_type == "page") {
      dispatch(
        manageElement({
          action: "update",
          element: "page",
          prev_state: page,
          new_state: {
            ...page,
            color: color,
          },
        })
      );
    } else if (component.component_type === "shape") {
      const index = components.findIndex((obj) => obj._id === component._id);
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          prev_state: components[index],
          new_state: {
            ...components[index],
            color: color,
          },
        })
      );
    } else if (component.component_type == "text") {
      const index = components.findIndex((obj) => obj._id === component._id);
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          prev_state: components[index],
          new_state: {
            ...components[index],
            color: color,
          },
        })
      );
    }
  }

  // const [color, setColor] = useColor(component.color || "white");
  // useEffect(() => {
  //   handleClick(color.hex);
  // }, [color]);

  const [colorDD, setColorDD] = useState(false);

  const cbRef = useRef(null); // create button ref
  const cdRef = useRef(null); // create dropdown ref
  const handleClickOutside = (event) => {
    if (
      cdRef.current && // tells us that whether the create dropdown  is open or not
      !cdRef.current.contains(event.target) && // tells us whether clicked item is create dropdown or not
      !cbRef.current.contains(event.target) // tells us whether clicked item is create button or not
    ) {
      setColorDD(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return (
    <div className="elements-sidebar">
      <div className="elements-sidebar-title">Colors</div>
      <div className="color-sidebar-body">
        {/* <div
          className="custom-color-btn"
          ref={cbRef}
          onClick={() => {
            setColorDD(!colorDD);
          }}
        >
          <img src="https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png"></img>
        </div> */}
        {/* {colorDD && (
          <div className="custom-color-picker" ref={cdRef}>
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              color={color}
              onChange={setColor}
            />
          </div>
        )} */}
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
      </div>
    </div>
  );
}
