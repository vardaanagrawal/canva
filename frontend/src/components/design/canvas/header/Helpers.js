import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar2 } from "../../../../redux/actions/x7Sidebar2Actions";
import { setSelectedComponent } from "../../../../redux/actions/x6ComponentActions";
import { manageElement } from "../../../../redux/actions/x5ProjectActions";
import {
  CopyIcon,
  LeftAlignIcon,
  ShapesIcon2,
  TextCenterAlignIcon,
  TextJustifyAlignIcon,
  TextLeftAlignIcon,
  TextRightAlignIcon,
  TransparencyIcon,
  TrashIcon,
} from "../../../../utils/icons";

import { v4 as uuidv4 } from "uuid";

export function HeaderDivider() {
  return <div className="header-divider"></div>;
}

export function PositionButton() {
  const dispatch = useDispatch();
  const sidebar2 = useSelector((state) => state.sidebar2);
  return (
    <div
      className={
        sidebar2.visible && sidebar2.type === "position"
          ? "design-btn design-btn-active"
          : "design-btn"
      }
      onClick={() => {
        dispatch(
          showSidebar2({
            visible:
              !sidebar2.visible || sidebar2.type !== "position" ? true : false,
            type:
              sidebar2.visible && sidebar2.type === "position"
                ? ""
                : "position",
          })
        );
      }}
    >
      Position
    </div>
  );
}

export function BgColorButton() {
  const dispatch = useDispatch();
  const sidebar2 = useSelector((state) => state.sidebar2);
  return (
    <div
      className={
        sidebar2.visible && sidebar2.type === "color"
          ? "design-btn design-btn-active"
          : "design-btn"
      }
      onClick={() => {
        dispatch(
          showSidebar2({
            visible:
              !sidebar2.visible || sidebar2.type !== "color" ? true : false,
            type: sidebar2.visible && sidebar2.type === "color" ? "" : "color",
          })
        );
      }}
    >
      <div className="header-bg-color"></div>
    </div>
  );
}

export function ShapeButton() {
  const dispatch = useDispatch();
  const sidebar2 = useSelector((state) => state.sidebar2);
  return (
    <div
      className={
        sidebar2.type === "shapes"
          ? "design-btn design-btn-active"
          : "design-btn"
      }
      onClick={() => {
        dispatch(
          showSidebar2({
            visible:
              !sidebar2.visible || sidebar2.type !== "shapes" ? true : false,
            type:
              sidebar2.visible && sidebar2.type === "shapes" ? "" : "shapes",
          })
        );
      }}
    >
      <ShapesIcon2 /> Shape
    </div>
  );
}

export function FontFamilyButton() {
  const dispatch = useDispatch();
  const component = useSelector((state) => state.component);
  return (
    <div
      className="header-font-btn"
      onClick={() => {
        dispatch(
          showSidebar2({
            visible: true,
            type: "text",
          })
        );
      }}
    >
      {component.font_name}
    </div>
  );
}

export function FontSizeButton() {
  const dispatch = useDispatch();
  const component = useSelector((state) => state.component);
  const [font_size, setFontSize] = useState(component.font_size);
  const components = useSelector((state) => state.page.components);
  const [first, setFirst] = useState(true);
  useEffect(() => {
    setFontSize(component.font_size);
  }, [component]);
  useEffect(() => {
    const index = components.findIndex((obj) => obj._id === component._id);
    if (!first)
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          prev_state: components[index],
          new_state: {
            ...components[index],
            font_size,
          },
        })
      );
    setFirst(false);
  }, [font_size]);

  return (
    <div className="header-font-size-btn">
      <div
        className="font-sign-btn"
        onClick={() => {
          setFontSize(font_size - 1);
        }}
      >
        -
      </div>
      <input
        className="font-size-input"
        value={font_size}
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      ></input>
      <div
        className="font-sign-btn"
        onClick={() => {
          setFontSize(font_size + 1);
        }}
      >
        +
      </div>
    </div>
  );
}

export function FontEditRow() {
  const dispatch = useDispatch();
  const component = useSelector((state) => state.component);
  const [bold, setBold] = useState(component.bold);
  const [italic, setItalic] = useState(component.italic);
  const [underline, setUnderline] = useState(component.underline);
  const [align, setAlign] = useState(component.text_align);
  const components = useSelector((state) => state.page.components);
  const sidebar2 = useSelector((state) => state.sidebar2);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    setBold(component.bold);
    setItalic(component.italic);
    setUnderline(component.underline);
    setAlign(component.text_align);
  }, [component]);
  useEffect(() => {
    const index = components.findIndex((obj) => obj._id === component._id);
    if (!first)
      dispatch(
        manageElement({
          action: "update",
          element: "component",
          prev_state: components[index],
          new_state: {
            ...components[index],
            bold: bold,
            italic: italic,
            underline: underline,
            text_align: align,
          },
        })
      );
    setFirst(false);
  }, [bold, italic, underline, align]);

  return (
    <div className="font-edit-row">
      <div
        className={
          sidebar2.type === "color"
            ? "design-btn design-btn-active text-color-btn"
            : "text-color-btn design-btn"
        }
        onClick={() => {
          dispatch(
            showSidebar2({
              visible:
                !sidebar2.visible || sidebar2.type !== "color" ? true : false,
              type:
                sidebar2.visible && sidebar2.type === "color" ? "" : "color",
            })
          );
        }}
      >
        A<div className="text-color"></div>
      </div>
      <div
        className={
          bold === "bold"
            ? "design-btn design-btn-active bold-btn"
            : "text-color-btn design-btn bold-btn"
        }
        onClick={() => {
          setBold(bold === "bold" ? "normal" : "bold");
        }}
      >
        B
      </div>
      <div
        className={
          italic === "italic"
            ? "design-btn design-btn-active italic-btn"
            : "text-color-btn design-btn italic-btn"
        }
        onClick={() => {
          setItalic(italic === "italic" ? "normal" : "italic");
        }}
      >
        I
      </div>
      <div
        className={
          underline === "underline"
            ? "design-btn design-btn-active underline-btn"
            : "text-color-btn design-btn underline-btn"
        }
        onClick={() => {
          setUnderline(underline === "underline" ? "none" : "underline");
        }}
      >
        U
      </div>

      {align === "left" && (
        <div
          className="design-btn"
          onClick={() => {
            setAlign("center");
          }}
        >
          <TextLeftAlignIcon />
        </div>
      )}
      {align === "center" && (
        <div
          className="design-btn"
          onClick={() => {
            setAlign("right");
          }}
        >
          <TextCenterAlignIcon />
        </div>
      )}
      {align === "right" && (
        <div
          className="design-btn"
          onClick={() => {
            setAlign("justify");
          }}
        >
          <TextRightAlignIcon />
        </div>
      )}
      {align === "justify" && (
        <div
          className="design-btn"
          onClick={() => {
            setAlign("left");
          }}
        >
          <TextJustifyAlignIcon />
        </div>
      )}
    </div>
  );
}

export function EditPhotoButton() {
  return <div className="header-btn">Edit Photo</div>;
}

export function TransparencyButton() {
  const [openDD, setOpenDD] = useState(false);

  const tbRef = useRef(null); // create button ref
  const tdRef = useRef(null); // create dropdown ref
  const handleClickOutside = (event) => {
    if (
      tdRef.current && // tells us that whether the create dropdown  is open or not
      !tdRef.current.contains(event.target) && // tells us whether clicked item is create dropdown or not
      !tbRef.current.contains(event.target) // tells us whether clicked item is create button or not
    ) {
      setOpenDD(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          setOpenDD(!openDD);
        }}
        className={openDD ? "design-btn-active design-btn" : "design-btn"}
        ref={tbRef}
      >
        <TransparencyIcon />
      </div>
      {openDD && <TransparencyDD tdRef={tdRef} />}
    </div>
  );
}

function TransparencyDD({ tdRef }) {
  const dispatch = useDispatch();
  const component = useSelector((state) => state.component);
  const components = useSelector((state) => state.page.components);

  const [transparency, setTransparency] = useState(component.opacity);

  useEffect(() => {
    const index = components.findIndex((obj) => obj._id === component._id);
    dispatch(
      manageElement({
        action: "update",
        element: "component",
        prev_state: components[index],
        new_state: {
          ...components[index],
          opacity: transparency,
        },
      })
    );
  }, [transparency]);

  return (
    <div className="t-dd" ref={tdRef}>
      <div>Transparency</div>
      <div>
        <input
          type="range"
          min={0}
          max={100}
          value={transparency || 100}
          onChange={(e) => {
            setTransparency(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
}

// #############################################################################################
// #############################################################################################
// #############################################################################################

export function DuplicateButton() {
  const dispatch = useDispatch();
  const component = useSelector((state) => state.component);
  const page = useSelector((state) => state.page);
  const user = useSelector((state) => state.user);
  function duplicate() {
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    addItem({
      ...component,
      _id: id,
      x: component.x + 20,
      y: component.y + 20,
      zIndex: page.components.length + 1,
    });
  }

  function addItem(item) {
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        item: item,
      })
    );
    dispatch(setSelectedComponent(item));
  }

  return (
    <div
      className="design-btn"
      onClick={() => {
        duplicate();
      }}
    >
      <CopyIcon />
    </div>
  );
}
export function DeleteButton() {
  const dispatch = useDispatch();
  const component = useSelector((state) => state.component);
  const page = useSelector((state) => state.page);

  async function deleteItem() {
    dispatch(
      manageElement({
        action: "delete",
        element: "component",
        item: {
          ...component,
          page_id: page._id,
        },
      })
    );
  }
  return (
    <div
      className="design-btn"
      onClick={() => {
        deleteItem();
      }}
    >
      <TrashIcon />
    </div>
  );
}
