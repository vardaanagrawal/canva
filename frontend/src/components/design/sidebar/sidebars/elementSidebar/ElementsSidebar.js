import React from "react";
import "./elementsSidebar.css";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";
import { useDispatch, useSelector } from "react-redux";
import { graphics } from "../../resources/graphics";
import { shapes } from "../../resources/shapes";
import { images } from "../../resources/images";

import { v4 as uuidv4 } from "uuid";

export default function ElementsSidebar() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  function addShape(item) {
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        item: {
          ...item, // svg, color, border_width, border_color
          _id: id,
          component_type: "shape",
          page_id: page._id,
          height: 100,
          width: 100,
          x: 100,
          y: 100,
          zIndex: page.components.length + 1,
          opacity: 100,
        },
      })
    );
  }

  function addImage(item) {
    // creating a temp id for the new image
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        item: {
          ...item, // image_url, height, width
          _id: id,
          component_type: "image",
          x: 100,
          y: 100,
          zIndex: page.components.length + 1,
          page_id: page._id,
        },
      })
    );
  }

  return (
    <div className="elements-sidebar">
      <div className="elements-sidebar-title">Add Elements</div>

      <div className="es-cat">
        <div className="es-cat-title">Shapes</div>
        {/* <div className="es-see-all">See all</div> */}
        <div className="es-cat-list">
          <div className="es-cat-list-inner">
            {shapes.map((item, index) => (
              <div
                className={`es-cat-shape`}
                onClick={() => {
                  addShape(item);
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
      </div>
      <div className="es-cat">
        <div className="es-cat-title">Graphics</div>
        {/* <div className="es-see-all">See all</div> */}
        <div className="es-cat-list">
          <div className="es-cat-list-inner">
            {graphics.map((item) => (
              <div
                className="es-cat-graphics"
                onClick={() => {
                  addImage(item);
                }}
              >
                <img src={item.image_url}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="es-cat">
        <div className="es-cat-title">Images</div>
        {/* <div className="es-see-all">See all</div> */}
        <div className="es-cat-list">
          <div className="es-cat-list-inner">
            {images.map((item, index) => (
              <div
                className="es-cat-images"
                onClick={() => {
                  addImage(item);
                }}
              >
                <img src={item.image_url}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
