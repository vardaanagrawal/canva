import React, { useEffect, useState } from "react";
import "./body.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedComponent,
  updateSelectedComponent,
} from "../../../../redux/actions/selectedComponentActions";

import { Rnd } from "react-rnd";

export default function Body({ zoom }) {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.current_project.canvas);
  const components = useSelector((state) => state.current_project.components);
  const selected_component = useSelector((state) => state.selected_component);
  const [text, setText] = useState(selected_component.text);
  useEffect(() => {
    if (selected_component.component_type === 3)
      dispatch(
        updateSelectedComponent(selected_component._id, {
          text: text,
        })
      );
  }, [text]);
  useEffect(() => {
    setText(selected_component.text);
  }, [selected_component]);

  function onDragStop(e, d, item) {
    const { x, y } = d;
    dispatch(
      updateSelectedComponent(item._id, {
        x: Math.floor(x),
        y: Math.floor(y),
      })
    );
  }
  return (
    <div
      className="canvas-body-outer"
      onClick={(e) => {
        if (e.target.className === "canvas-body-outer")
          dispatch(setSelectedComponent({ component_type: 0 }));
      }}
    >
      <div
        className="canvas-body"
        style={{
          height: `${canvas.height * zoom}px`,
          width: `${canvas.width * zoom}px`,
        }}
      >
        <div
          className={`canvas-page ${
            selected_component._id == canvas._id && "selected_component"
          }`}
          onClick={(e) => {
            if (e.target.classList.contains("canvas-page"))
              dispatch(setSelectedComponent({ ...canvas, component_type: 1 }));
          }}
          style={{
            height: `${canvas.height}px`,
            width: `${canvas.width}px`,
            background: canvas.bg_color,
            position: "relative",
            transform: `scale(${zoom})`,
          }}
        >
          {components.map((item, index) =>
            item.component_type == 2 ? (
              <Rnd
                size={{ width: item.height, height: item.width }}
                position={{ x: item.x * zoom, y: item.y * zoom }}
                onDragStop={(e, d) => onDragStop(e, d, item)}
                key={index}
                enableResizing={false}
                lockAspectRatio={1}
                disableDragging={selected_component._id != item._id}
                style={{
                  zIndex: 0,
                }}
              >
                <div
                  key={index}
                  className={`shape-component ${
                    selected_component._id == item._id && "selected_component"
                  }`}
                >
                  <div
                    className="shape-component"
                    style={{
                      height: `${item.height}px`,
                      width: `${item.width}px`,
                      background: item.shape_bg_color,
                      clipPath: item.shape_clip_path,
                      // zIndex: 0
                    }}
                    onClick={(e) => {
                      if (e.target.classList.contains("shape-component"))
                        dispatch(setSelectedComponent(item));
                    }}
                  ></div>
                </div>
              </Rnd>
            ) : item.component_type == 3 ? (
              <Rnd
                position={{ x: item.x, y: item.y }}
                onDragStop={(e, d) => onDragStop(e, d, item)}
                key={index}
                enableResizing={false}
                lockAspectRatio={1}
                disableDragging={selected_component._id != item._id}
                style={{
                  zIndex: 1,
                }}
              >
                <div
                  key={index}
                  className={`text-box-component ${
                    selected_component._id == item._id && "selected_component"
                  }`}
                >
                  <input
                    className="textbox-component-input"
                    style={{
                      fontSize: `${item.font_size}px`,
                      fontFamily: item.font_family,
                      color: item.font_color,
                      fontWeight: item.text_bold ? "bold" : "normal",
                      fontStyle: item.text_italic ? "italic" : "normal",
                      textDecoration: item.text_underline
                        ? "underline"
                        : "none",
                    }}
                    onClick={(e) => {
                      if (
                        e.target.classList.contains("textbox-component-input")
                      ) {
                        dispatch(setSelectedComponent(item));
                        setText(item.text);
                      }
                    }}
                    onChange={(e) => {
                      setText(e.target.value);
                      // dispatch(
                      //   updateSelectedComponent(item._id, {
                      //     text: text,
                      //   })
                      // );
                    }}
                    value={
                      selected_component._id === item._id ? text : item.text
                      // item.text
                    }
                  ></input>
                </div>
              </Rnd>
            ) : (
              item.component_type == 4 && (
                <Rnd
                  size={{
                    width: item.width,
                    height: item.height - 10,
                  }}
                  position={{ x: item.x, y: item.y }}
                  onDragStop={(e, d) => onDragStop(e, d, item)}
                  key={index}
                  enableResizing={false}
                  lockAspectRatio={false}
                  disableDragging={selected_component._id != item._id}
                  style={{
                    zIndex: 2,
                  }}
                >
                  <div
                    key={index}
                    className={`image-component ${
                      selected_component._id == item._id && "selected_component"
                    }`}
                    style={{
                      height: `${item.height - 10}px`,
                    }}
                  >
                    <img
                      src={item.image_url}
                      className="image-component-img"
                      style={{
                        height: "100%",
                        width: "100%",
                        zIndex: item.zIndex,
                      }}
                      onClick={(e) => {
                        if (e.target.classList.contains("image-component-img"))
                          dispatch(setSelectedComponent(item));
                      }}
                      draggable={false}
                    ></img>
                  </div>
                </Rnd>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}
