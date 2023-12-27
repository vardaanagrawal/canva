import React from "react";
import { images } from "../utils";
import { setSelectedComponent } from "../../../../redux/actions/selectedComponentActions";
import { addComponent } from "../../../../redux/actions/currentProjectActions";
import { useDispatch } from "react-redux";

export default function ImageSidebar() {
  const dispatch = useDispatch();
  function addItem(item) {
    dispatch(addComponent(item));
    dispatch(setSelectedComponent(item));
  }
  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Images</div>
      <div className="sidebar2-body images-sidebar-body">
        <div className="images-sidebar-body-left">
          {images.map(
            (item, index) =>
              index % 2 == 1 && (
                <div className="images-sidebar-item" key={index}>
                  <div
                    className="image-sample"
                    onClick={() => {
                      const id = Math.floor(Math.random() * 900) + 100;
                      addItem({
                        ...item,
                        _id: id,
                        component_type: 4,
                        height: 100,
                        width: 100,
                        x: 100,
                        y: 100,
                      });
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
              index % 2 == 0 && (
                <div className="images-sidebar-item" key={index}>
                  <div
                    className="image-sample"
                    onClick={() => {
                      const id = Math.floor(Math.random() * 900) + 100;
                      addItem({
                        ...item,
                        _id: id,
                        component_type: 4,
                        height: 100,
                        width: 100,
                        x: 100,
                        y: 100,
                      });
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
