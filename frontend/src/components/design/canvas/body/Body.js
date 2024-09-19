import React, { useEffect, useRef, useState } from "react";
import "./body.css";
import { useDispatch, useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import { setSelectedComponent } from "../../../../redux/actions/x6ComponentActions";
import {
  changeComponentSize,
  manageElement,
} from "../../../../redux/actions/x5ProjectActions";

import { createUseGesture, pinchAction } from "@use-gesture/react";

const useGesture = createUseGesture([pinchAction]);

export default function Body2({ zoom, setZoom }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.className === "canvas-body") {
      dispatch(setSelectedComponent({ component_type: "body" }));
    }
  };

  const ref = useRef();

  useGesture(
    {
      onPinch: ({ offset: [s] }) => {
        setZoom(Math.floor(s * 100));
      },
    },
    {
      target: ref,
      pinch: {
        from: [zoom / 100, 0],
        scaleBounds: { min: 0.2, max: 5 },
        rubberband: false,
      },
    }
  );

  return (
    <div className="canvas-body" onClick={handleClick} ref={ref}>
      <Page zoom={zoom} />
    </div>
  );
}

const handleClasses = {
  top: "rnd-top-handle",
  bottom: "rnd-bottom-handle",
  left: "rnd-left-handle",
  right: "rnd-right-handle",
  topLeft: "rnd-topLeft-handle",
  topRight: "rnd-topRight-handle",
  bottomLeft: "rnd-bottomLeft-handle",
  bottomRight: "rnd-bottomRight-handle",
};

function Page({ zoom }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const components = useSelector((state) => state.page.components);
  const component = useSelector((state) => state.component);

  const [hover, setHover] = useState(false);
  const [screen, setScreen] = useState(false);

  const containerStyle = {
    height: (zoom / 100) * page.height + "px",
    width: (zoom / 100) * page.width + "px",
    background: page.color,
    position: "relative",
    outline:
      (hover._id === page._id || component._id === page._id) &&
      "solid 3px blueviolet",
  };

  const [compX, setCompX] = useState(component.x + "px");
  const [compY, setCompY] = useState(component.y + "px");

  useEffect(() => {
    setCompX(component.x + "px");
    setCompY(component.y + "px");
  }, [component]);

  const [dragging, setDragging] = useState(-1);

  const [text, setText] = useState(component.text);
  useEffect(() => {
    setText(component.text);
  }, [component]);

  useEffect(() => {
    if (component.component_type === "text") {
      const index = components.findIndex((obj) => obj._id === component._id);
      dispatch({
        type: "change_component_size",
        payload: {
          ...components[index],
          text: text,
        },
      });
    }
  }, [text]);

  return (
    <div className="page-container" style={containerStyle}>
      <div
        className="page"
        onMouseOver={(e) => {
          setHover(page);
        }}
        onMouseLeave={() => {
          setHover(-1);
          setScreen(false);
        }}
        onClick={(e) => {
          if (e.target.className === "page")
            dispatch(setSelectedComponent({ ...page, component_type: "page" }));
        }}
      >
        {components.map((item, index) => (
          <div
            key={item._id}
            style={{
              position: "absolute",
              top:
                component._id === item._id && dragging === item._id
                  ? compY + "px"
                  : (zoom / 100) * item.y + "px",
              left:
                component._id === item._id && dragging === item._id
                  ? compX + "px"
                  : (zoom / 100) * item.x + "px",
              height: (zoom / 100) * item.height + "px",
              width: (zoom / 100) * item.width + "px",
              zIndex: item.zIndex,
            }}
          >
            <PageComponent
              item={item}
              zoom={zoom}
              text={text}
              setText={setText}
            />
          </div>
        ))}
      </div>
      {components.map(
        (item, index) =>
          (screen || component._id === item._id) && (
            <CustomRnd
              key={item._id}
              item={item}
              index={index}
              zoom={zoom}
              screen={screen}
              setScreen={setScreen}
              hover={hover}
              setHover={setHover}
              setCompX={setCompX}
              setCompY={setCompY}
              dragging={dragging}
              setDragging={setDragging}
              text={text}
              setText={setText}
            />
          )
      )}
      {!screen && <Screen setScreen={setScreen} />}
    </div>
  );
}

function CustomRnd({
  item,
  zoom,
  screen,
  setScreen,
  hover,
  setHover,
  index,
  setCompX,
  setCompY,
  dragging,
  setDragging,
  text,
  setText,
}) {
  const component = useSelector((state) => state.component);

  function onDragStop(e, d, index) {
    const { x, y } = d;
    if (item.x !== x || item.y !== y)
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          prev_state: item,
          new_state: {
            ...item,
            x: Math.floor((100 / zoom) * x),
            y: Math.floor((100 / zoom) * y),
          },
        })
      );
  }

  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  function onResize(ref, position, item) {
    const height = ref.offsetHeight;
    const width = ref.offsetWidth;
    const x = position.x;
    const y = position.y;
    dispatch(
      changeComponentSize({
        _id: item._id,
        x: Math.floor((100 / zoom) * x),
        y: Math.floor((100 / zoom) * y),
        height: Math.floor((100 / zoom) * height),
        width: Math.floor((100 / zoom) * width),
        page_id: page._id,
      })
    );
  }

  const [startH, setStartH] = useState();
  const [startW, setStartW] = useState();
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();

  function onResizeStart(ref, position, item) {
    const height = ref.offsetHeight;
    const width = ref.offsetWidth;
    const x = item.x;
    const y = item.y;
    setStartH(item.height);
    setStartW(item.width);
    setStartX(x);
    setStartY(y);
  }

  function onResizeStop(ref, position) {
    const height = ref.offsetHeight;
    const width = ref.offsetWidth;
    const x = position.x;
    const y = position.y;
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        prev_state: {
          ...item,
          x: startX,
          y: startY,
          height: startH,
          width: startW,
          page_id: page._id,
        },
        new_state: {
          ...item,
          x: Math.floor((100 / zoom) * x),
          y: Math.floor((100 / zoom) * y),
          height: Math.floor((100 / zoom) * height),
          width: Math.floor((100 / zoom) * width),
          page_id: page._id,
        },
      })
    );
  }

  useEffect(() => {
    const topHandle = document.querySelector(
      `#selected_component .rnd-top-handle`
    );
    const topHandleInner = document.createElement("div");
    topHandleInner.className = "rnd-top-handle-inner";
    if (topHandle && topHandle.childElementCount < 1) {
      topHandle.appendChild(topHandleInner);
    }
    const bottomHandle = document.querySelector(
      `#selected_component .rnd-bottom-handle`
    );
    const bottomHandleInner = document.createElement("div");
    bottomHandleInner.className = "rnd-bottom-handle-inner";
    if (bottomHandle && bottomHandle.childElementCount < 1) {
      bottomHandle.appendChild(bottomHandleInner);
    }
    const leftHandle = document.querySelector(
      `#selected_component .rnd-left-handle`
    );
    const leftHandleInner = document.createElement("div");
    leftHandleInner.className = "rnd-left-handle-inner";
    if (leftHandle && leftHandle.childElementCount < 1) {
      leftHandle.appendChild(leftHandleInner);
    }
    const rightHandle = document.querySelector(
      `#selected_component .rnd-right-handle`
    );
    const rightHandleInner = document.createElement("div");
    rightHandleInner.className = "rnd-right-handle-inner";
    if (rightHandle && rightHandle.childElementCount < 1) {
      rightHandle.appendChild(rightHandleInner);
    }
    const topLeftHandle = document.querySelector(
      `#selected_component .rnd-topLeft-handle`
    );
    const topLeftHandleInner = document.createElement("div");
    topLeftHandleInner.className = "rnd-topLeft-handle-inner";
    if (topLeftHandle && topLeftHandle.childElementCount < 1) {
      topLeftHandle.appendChild(topLeftHandleInner);
    }
    const bottomLeftHandle = document.querySelector(
      `#selected_component .rnd-bottomLeft-handle`
    );
    const bottomLeftHandleInner = document.createElement("div");
    bottomLeftHandleInner.className = "rnd-bottomLeft-handle-inner";
    if (bottomLeftHandle && bottomLeftHandle.childElementCount < 1) {
      bottomLeftHandle.appendChild(bottomLeftHandleInner);
    }
    const topRightHandle = document.querySelector(
      `#selected_component .rnd-topRight-handle`
    );
    const topRightHandleInner = document.createElement("div");
    topRightHandleInner.className = "rnd-topRight-handle-inner";
    if (topRightHandle && topRightHandle.childElementCount < 1) {
      topRightHandle.appendChild(topRightHandleInner);
    }
    const bottomRightHandle = document.querySelector(
      `#selected_component .rnd-bottomRight-handle`
    );
    const bottomRightHandleInner = document.createElement("div");
    bottomRightHandleInner.className = "rnd-bottomRight-handle-inner";
    if (bottomRightHandle && bottomRightHandle.childElementCount < 1) {
      bottomRightHandle.appendChild(bottomRightHandleInner);
    }
  }, [component]);

  const [aspectRatio, setAspectRatio] = useState(false);

  return (
    <Rnd
      id={component._id === item._id ? `selected_component` : ""}
      size={{
        height: (zoom / 100) * item.height,
        width: (zoom / 100) * item.width,
      }}
      position={{
        x: (zoom / 100) * item.x,
        y: (zoom / 100) * item.y,
      }}
      disableDragging={component._id !== item._id}
      onMouseEnter={(e) => {
        if (dragging === -1 && screen === page) {
          setHover(item._id);
        }
      }}
      onMouseLeave={() => {
        setHover(-1);
        setScreen(false);
      }}
      onClick={() => {
        setCompX(item.x + "px");
        setCompY(item.y + "px");
        dispatch(setSelectedComponent(item));
      }}
      onDragStart={() => {
        setDragging(item._id);
      }}
      onDrag={(e, d) => {
        setCompX(d.x);
        setCompY(d.y);
      }}
      onDragStop={(e, d) => {
        setDragging(-1);
        onDragStop(e, d, index);
      }}
      onResize={(e, direction, ref, delta, position) => {
        onResize(ref, position, item);
      }}
      onResizeStart={(e, direction, ref, delta, position) => {
        if (
          direction === "topLeft" ||
          direction === "topRight" ||
          direction === "bottomLeft" ||
          direction === "bottomRight"
        ) {
          setAspectRatio(true);
        } else {
          setAspectRatio(false);
        }
        onResizeStart(ref, position, item);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onResizeStop(ref, position, item);
      }}
      lockAspectRatio={aspectRatio}
      style={{
        outline:
          (hover === item._id || component._id === item._id) &&
          "solid blueviolet 3px",
        zIndex: item.zIndex,
      }}
      enableResizing={{
        top: component._id === item._id,
        bottom: component._id === item._id,
        left: component._id === item._id,
        right: component._id === item._id,
        topLeft: component._id === item._id,
        topRight: component._id === item._id,
        bottomLeft: component._id === item._id,
        bottomRight: component._id === item._id,
      }}
      resizeHandleClasses={handleClasses}
    >
      {item.component_type === "text" && item._id === component._id && (
        <textarea
          style={{
            height: "100%",
            width: "100%",
            opacity: item.opacity + "%",
            fontFamily: item.font_family,
            fontSize: `${(zoom / 100) * item.font_size}px`,
            color: item.color,
            fontWeight: item.bold,
            fontStyle: item.italic,
            textDecoration: item.underline,
            textAlign: item.text_align,
            WebkitTextStroke: item.text_outline,
            textShadow: item.text_shadow,
            background: "none",
            border: "none",
            resize: "none",
          }}
          className="textbox-component-input"
          onClick={(e) => {
            if (e.target.classList.contains("textbox-component-input")) {
              setText(item.text);
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={component._id === item._id ? text : item.text}
        ></textarea>
      )}
    </Rnd>
  );
}

function Screen({ setScreen }) {
  const page = useSelector((state) => state.page);
  return (
    <div
      className="page-screen"
      onMouseOver={(e) => {
        setScreen(page);
      }}
      onMouseLeave={() => {
        setScreen(false);
      }}
    ></div>
  );
}

function PageComponent({ item, zoom, text, setText }) {
  const component = useSelector((state) => state.component);
  // const [text, setText] = useState(item.text);
  if (item.component_type === "shape") {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          opacity: item.opacity + "%",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          height="100%"
          width="100%"
        >
          <path
            d={item.svg}
            fill={item.color}
            stroke={item.border_color}
            strokeWidth={item.border_width}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  } else if (item.component_type === "text" && item._id !== component._id) {
    // } else if (item.component_type === "text" ) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          opacity: item.opacity + "%",
          fontFamily: item.font_family,
          fontSize: `${(zoom / 100) * item.font_size}px`,
          color: item.color,
          fontWeight: item.bold,
          fontStyle: item.italic,
          textDecoration: item.underline,
          textAlign: item.text_align,
          WebkitTextStroke: item.text_outline,
          textShadow: item.text_shadow,
          background: "none",
        }}
        className="textbox-component-input"
        onClick={(e) => {
          if (e.target.classList.contains("textbox-component-input")) {
            setText(item.text);
          }
        }}
      >
        {component._id === item._id ? text : item.text}
      </div>
    );
  } else if (item.component_type === "image") {
    return (
      <img
        src={item.image_url}
        alt=""
        style={{
          height: "100%",
          width: "100%",
          opacity: item.opacity + "%",
        }}
        draggable={false}
      ></img>
    );
  }
  return <div></div>;
}
