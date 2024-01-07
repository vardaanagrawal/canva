import React, { useEffect, useRef, useState } from "react";
import "./body.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedComponent } from "../../../../redux/actions/selectedComponentActions";

import { Rnd } from "react-rnd";
import { manageElement } from "../../../../redux/actions/currentProjectActions";

export default function Body({ zoom }) {
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.current_project.canvas);
  const components = useSelector((state) => state.current_project.components);
  const selected_component = useSelector((state) => state.selected_component);
  const [text, setText] = useState(selected_component.text);
  useEffect(() => {
    if (selected_component.component_type === 3) {
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
            text: text,
          },
        })
      );
    }
  }, [text]);
  useEffect(() => {
    setText(selected_component.text);
  }, [selected_component]);

  function onDragStop(e, d, item) {
    const { x, y } = d;
    if (item.x !== x || item.y !== y)
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          method: "change",
          prev_state: item,
          new_state: {
            _id: item._id,
            x: Math.floor((100 / zoom) * x),
            y: Math.floor((100 / zoom) * y),
          },
        })
      );
  }

  function onResize(ref, position, item) {
    const height = ref.offsetHeight;
    const width = ref.offsetWidth;
    const x = position.x;
    const y = position.y;
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        method: "change",
        prev_state: item,
        new_state: {
          _id: item._id,
          x: Math.floor((100 / zoom) * x),
          y: Math.floor((100 / zoom) * y),
          height: Math.floor((100 / zoom) * height),
          width: Math.floor((100 / zoom) * width),
        },
      })
    );
  }

  const bodyRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div
      className="canvas-body"
      ref={bodyRef}
      onClick={(e) => {
        if (bodyRef && bodyRef.current === e.target)
          dispatch(setSelectedComponent({ component_type: 0 }));
      }}
    >
      <div
        className="canvas-outer"
        style={{
          height: `${(zoom / 100) * canvas.height}px`,
          width: `${(zoom / 100) * canvas.width}px`,
          outline: selected_component._id === canvas._id && "solid #8b3dff 3px",
        }}
      >
        <div
          className="canvas"
          ref={canvasRef}
          onClick={(e) => {
            if (canvasRef && canvasRef.current === e.target)
              dispatch(setSelectedComponent({ ...canvas, component_type: 1 }));
          }}
          style={{
            height: `${(zoom / 100) * canvas.height}px`,
            width: `${(zoom / 100) * canvas.width}px`,
            background: `${canvas.bg_color}`,
            // scale: `${zoom / 100}`,
          }}
        >
          {components.map((item, index) => {
            if (item.component_type === 2) {
              return (
                <Rnd
                  size={{
                    height: (zoom / 100) * item.height,
                    width: (zoom / 100) * item.width,
                  }}
                  position={{
                    x: (zoom / 100) * item.x,
                    y: (zoom / 100) * item.y,
                  }}
                  style={{
                    outline:
                      selected_component._id === item._id &&
                      "solid #8b3dff 3px",
                  }}
                  enableResizing={selected_component._id === item._id}
                  disableDragging={selected_component._id !== item._id}
                  onDragStop={(e, d) => onDragStop(e, d, item)}
                  onResize={(e, direction, ref, delta, position) => {
                    onResize(ref, position, item);
                  }}
                  lockAspectRatio
                  onClick={() => {
                    dispatch(setSelectedComponent(item));
                  }}
                  key={item._id}
                >
                  <div
                    style={{
                      height: `${(zoom / 100) * item.height}px`,
                      width: `${(zoom / 100) * item.width}px`,
                      background: item.shape_bg_color,
                      clipPath: item.shape_clip_path,
                    }}
                  ></div>
                </Rnd>
              );
            } else if (item.component_type === 3) {
              console.log(item);
              return (
                <Rnd
                  size={{
                    height: (zoom / 100) * item.height,
                    width: (zoom / 100) * item.width,
                  }}
                  position={{
                    x: (zoom / 100) * item.x,
                    y: (zoom / 100) * item.y,
                  }}
                  style={{
                    outline:
                      selected_component._id === item._id &&
                      "solid #8b3dff 3px",
                  }}
                  enableResizing={selected_component._id === item._id}
                  disableDragging={selected_component._id !== item._id}
                  onDragStop={(e, d) => onDragStop(e, d, item)}
                  onResize={(e, direction, ref, delta, position) => {
                    onResize(ref, position, item);
                  }}
                  onClick={() => {
                    dispatch(setSelectedComponent(item));
                  }}
                  key={item._id}
                >
                  <textarea
                    style={{
                      height: `${(zoom / 100) * item.height}px`,
                      width: `${(zoom / 100) * item.width}px`,
                      padding: "0",
                      background: "none",
                      border: "none",
                      fontSize: `${(zoom / 100) * item.font_size}px`,
                      fontFamily: item.font_family,
                      color: item.font_color,
                      fontWeight: item.text_bold ? "bold" : "normal",
                      fontStyle: item.text_italic ? "italic" : "normal",
                      textDecoration: item.text_underline
                        ? "underline"
                        : "none",
                      resize: "none",
                    }}
                    className="textbox-component-input"
                    onClick={(e) => {
                      if (
                        e.target.classList.contains("textbox-component-input")
                      ) {
                        setText(item.text);
                      }
                    }}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    value={
                      selected_component._id === item._id ? text : item.text
                    }
                  ></textarea>
                </Rnd>
              );
            } else if (item.component_type === 4) {
              return (
                <Rnd
                  size={{
                    height: (zoom / 100) * item.height,
                    width: (zoom / 100) * item.width,
                  }}
                  position={{
                    x: (zoom / 100) * item.x,
                    y: (zoom / 100) * item.y,
                  }}
                  style={{
                    outline:
                      selected_component._id === item._id &&
                      "solid #8b3dff 3px",
                  }}
                  enableResizing={selected_component._id === item._id}
                  disableDragging={selected_component._id !== item._id}
                  onDragStop={(e, d) => onDragStop(e, d, item)}
                  onResize={(e, direction, ref, delta, position) => {
                    onResize(ref, position, item);
                  }}
                  // lockAspectRatio
                  onClick={() => {
                    dispatch(setSelectedComponent(item));
                  }}
                  key={item._id}
                >
                  <img
                    src={item.image_url}
                    className="image-component-img"
                    style={{
                      height: `${(zoom / 100) * item.height}px`,
                      width: `${(zoom / 100) * item.width}px`,
                    }}
                    draggable={false}
                  ></img>
                </Rnd>
              );
            }
          })}
        </div>
      </div>
    </div>

    // #########################################################################################33
    // <div
    //   className="canvas-body-outer"
    //   onClick={(e) => {
    //     if (e.target.className === "canvas-body-outer")
    //       dispatch(setSelectedComponent({ component_type: 0 }));
    //   }}
    // >
    //   <div
    //     className="canvas-body"
    //     style={{
    //       height: `${canvas.height * zoom}px`,
    //       width: `${canvas.width * zoom}px`,
    //     }}
    //   >
    //     <div
    //       className={`canvas-page ${
    //         selected_component._id == canvas._id && "selected_component"
    //       }`}
    //       onClick={(e) => {
    //         if (e.target.classList.contains("canvas-page"))
    //           dispatch(setSelectedComponent({ ...canvas, component_type: 1 }));
    //       }}
    //       style={{
    //         height: `${canvas.height}px`,
    //         width: `${canvas.width}px`,
    //         background: canvas.bg_color,
    //         position: "relative",
    //         transform: `scale(${zoom})`,
    //       }}
    //     >
    //       {components.map((item, index) =>
    //         item.component_type == 2 ? (
    //           <Rnd
    //             size={{ width: item.height, height: item.width }}
    //             position={{ x: item.x * zoom, y: item.y * zoom }}
    //             onDragStop={(e, d) => onDragStop(e, d, item)}
    //             key={index}
    //             enableResizing={false}
    //             lockAspectRatio={1}
    //             disableDragging={selected_component._id != item._id}
    //             style={{
    //               zIndex: 0,
    //             }}
    //           >
    //             <div
    //               key={index}
    //               className={`shape-component ${
    //                 selected_component._id == item._id && "selected_component"
    //               }`}
    //             >
    //               <div
    //                 className="shape-component"
    //                 style={{
    //                   height: `${item.height}px`,
    //                   width: `${item.width}px`,
    //                   background: item.shape_bg_color,
    //                   clipPath: item.shape_clip_path,
    //                 }}
    //                 onClick={(e) => {
    //                   if (e.target.classList.contains("shape-component"))
    //                     dispatch(setSelectedComponent(item));
    //                 }}
    //               ></div>
    //             </div>
    //           </Rnd>
    //         ) : item.component_type == 3 ? (
    //           <Rnd
    //             position={{ x: item.x, y: item.y }}
    //             onDragStop={(e, d) => onDragStop(e, d, item)}
    //             key={index}
    //             enableResizing={false}
    //             lockAspectRatio={1}
    //             disableDragging={selected_component._id != item._id}
    //             style={{
    //               zIndex: 1,
    //             }}
    //           >
    //             <div
    //               key={index}
    //               className={`text-box-component ${
    //                 selected_component._id == item._id && "selected_component"
    //               }`}
    //             >
    //               <textarea
    //                 className="textbox-component-input"
    //                 style={{
    //                   fontSize: `${item.font_size}px`,
    //                   fontFamily: item.font_family,
    //                   color: item.font_color,
    //                   fontWeight: item.text_bold ? "bold" : "normal",
    //                   fontStyle: item.text_italic ? "italic" : "normal",
    //                   textDecoration: item.text_underline
    //                     ? "underline"
    //                     : "none",
    //                   resize: "none",
    //                 }}
    //                 onClick={(e) => {
    //                   if (
    //                     e.target.classList.contains("textbox-component-input")
    //                   ) {
    //                     dispatch(setSelectedComponent(item));
    //                     setText(item.text);
    //                   }
    //                 }}
    //                 onChange={(e) => {
    //                   setText(e.target.value);
    //                 }}
    //                 value={
    //                   selected_component._id === item._id ? text : item.text
    //                 }
    //               ></textarea>
    //             </div>
    //           </Rnd>
    //         ) : (
    //           item.component_type == 4 && (
    //             <Rnd
    //               size={{
    //                 width: item.width,
    //                 height: item.height - 10,
    //               }}
    //               position={{ x: item.x, y: item.y }}
    //               onDragStop={(e, d) => onDragStop(e, d, item)}
    //               key={index}
    //               enableResizing={true}
    //               lockAspectRatio={false}
    //               disableDragging={selected_component._id != item._id}
    //               style={{
    //                 zIndex: 2,
    //               }}
    //             >
    //               <div
    //                 key={index}
    //                 className={`image-component ${
    //                   selected_component._id == item._id && "selected_component"
    //                 }`}
    //                 style={{
    //                   height: `${item.height - 10}px`,
    //                 }}
    //               >
    //                 <img
    //                   src={item.image_url}
    //                   className="image-component-img"
    //                   style={{
    //                     height: "100%",
    //                     width: "100%",
    //                     zIndex: item.zIndex,
    //                   }}
    //                   onClick={(e) => {
    //                     if (e.target.classList.contains("image-component-img"))
    //                       dispatch(setSelectedComponent(item));
    //                   }}
    //                   draggable={false}
    //                 ></img>
    //               </div>
    //             </Rnd>
    //           )
    //         )
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}

/*
<Rnd
  default={{
    x: 150,
    y: 205,
  }}
  style={{ border: "solid red 3px" }}>
  <div style={{ background: "white", width: "max-content" }}>
    <div
      className="shape-component"
      style={{
        height: `100px`,
        width: `100px`,
        background: "purple",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      }}
    ></div>
  </div>
</Rnd>
*/
