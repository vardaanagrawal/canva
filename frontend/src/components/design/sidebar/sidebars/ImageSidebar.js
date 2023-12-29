import React from "react";
import { manageElement } from "../../../../redux/actions/currentProjectActions";
import { setSelectedComponent } from "../../../../redux/actions/selectedComponentActions";
import { useDispatch } from "react-redux";
import { images } from "../utils";

export default function ImageSidebar() {
  const dispatch = useDispatch();

  function handleClick(item) {
    // creating a temp id for the new image
    const id = Math.floor(Math.random() * 900) + 100;
    addItem({
      ...item,
      _id: id,
      component_type: 4,
      x: 100,
      y: 100,
    });
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
      <div className="sidebar2-title">Images</div>
      <div className="sidebar2-body images-sidebar-body">
        <div className="images-sidebar-body-left">
          {images.map(
            (item, index) =>
              index % 2 == 0 && (
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
              )
          )}
        </div>
        <div className="images-sidebar-body-left">
          {images.map(
            (item, index) =>
              index % 2 == 1 && (
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
              )
          )}
        </div>
      </div>
    </div>
  );
}
