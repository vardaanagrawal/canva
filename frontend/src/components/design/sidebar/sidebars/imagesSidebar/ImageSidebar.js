import React from "react";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../resources/images";
import "./imageSidebar.css";

import { v4 as uuidv4 } from "uuid";

export default function ImageSidebar() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  function handleClick(item) {
    // creating a temp id for the new image
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        item: {
          ...item,
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
      <div className="elements-sidebar-title">Add Images</div>
      <div className="images-sidebar-body">
        {images.map((item, index) => (
          <div className="images-sidebar-item" key={index}>
            <div
              className="image-sample"
              onClick={() => {
                handleClick(item);
              }}
            >
              <img src={item.image_url}></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
