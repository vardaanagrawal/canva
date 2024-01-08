import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar2 } from "../../../../redux/actions/x7Sidebar2Actions";
import { setSelectedComponent } from "../../../../redux/actions/x6ComponentActions";
import { manageElement } from "../../../../redux/actions/x5ProjectActions";

export function HeaderDivider() {
  return <div className="header-divider"></div>;
}

export function PositionButton() {
  const dispatch = useDispatch();
  return (
    <div
      className="header-btn"
      onClick={() => {
        dispatch(
          showSidebar2({
            visible: true,
            type: "position",
          })
        );
      }}
    >
      Position
    </div>
  );
}

export function ShapeButton() {
  const dispatch = useDispatch();
  return (
    <div
      className="header-btn"
      onClick={() => {
        dispatch(
          showSidebar2({
            visible: true,
            type: "shapes",
            mode: "edit",
          })
        );
      }}
    >
      <i className="fa-solid fa-shapes"></i> Shape
    </div>
  );
}

export function BgColorButton() {
  const dispatch = useDispatch();
  return (
    <div
      className="header-btn"
      onClick={() => {
        dispatch(
          showSidebar2({
            visible: true,
            type: "color",
          })
        );
      }}
    >
      <div className="header-bg-color"></div>
    </div>
  );
}

export function FontFamilyButton() {
  const dispatch = useDispatch();
  const selected_component = useSelector((state) => state.component);
  const current_project = useSelector((state) => state.project);
  const [font_family, setFontFamily] = useState(selected_component.font_family);
  useEffect(() => {
    const cur_component = current_project.components.filter(
      (x) => x._id === selected_component._id
    )[0];
    setFontFamily(cur_component.font_name);
  }, [current_project]);
  return (
    <div
      className="header-font-btn"
      onClick={() => {
        dispatch(
          showSidebar2({
            visible: true,
            type: "text",
            mode: "edit",
          })
        );
      }}
    >
      {font_family}
    </div>
  );
}

export function FontSizeButton() {
  const dispatch = useDispatch();
  const selected_component = useSelector((state) => state.component);
  const [font_size, setFontSize] = useState(selected_component.font_size);
  const components = useSelector((state) => state.project.components);

  useEffect(() => {
    setFontSize(selected_component.font_size);
  }, [selected_component]);
  useEffect(() => {
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
          font_size,
        },
      })
    );
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
  const selected_component = useSelector((state) => state.component);
  const [bold, setBold] = useState(selected_component.text_bold);
  const [italic, setItalic] = useState(selected_component.text_italic);
  const [underline, setUnderline] = useState(selected_component.text_underline);
  const components = useSelector((state) => state.project.components);

  useEffect(() => {
    setBold(selected_component.text_bold);
    setItalic(selected_component.text_italic);
    setUnderline(selected_component.text_underline);
  }, [selected_component]);
  useEffect(() => {
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
          text_bold: bold,
          text_italic: italic,
          text_underline: underline,
        },
      })
    );
  }, [bold, italic, underline]);

  return (
    <div className="font-edit-row">
      <div
        className="text-color-btn header-btn"
        onClick={() => {
          dispatch(
            showSidebar2({
              visible: true,
              type: "color",
            })
          );
        }}
      >
        A<div className="text-color"></div>
      </div>
      <div
        className={`header-btn ${bold ? "bold-btn-selected" : "bold-btn"}`}
        onClick={() => {
          setBold(!bold);
        }}
      >
        B
      </div>
      <div
        className={`header-btn ${
          italic ? "italic-btn-selected" : "italic-btn"
        }`}
        onClick={() => {
          setItalic(!italic);
        }}
      >
        I
      </div>
      <div
        className={`header-btn ${
          underline ? "underline-btn-selected" : "underline-btn"
        }`}
        onClick={() => {
          setUnderline(!underline);
        }}
      >
        U
      </div>
    </div>
  );
}

export function EditPhotoButton() {
  return <div className="header-btn">Edit Photo</div>;
}

export function DuplicateButton() {
  const dispatch = useDispatch();
  const selected_component = useSelector((state) => state.component);
  const current_project = useSelector((state) => state.project);
  function duplicate() {
    const id = Math.floor(Math.random() * 900) + 100;
    const a = current_project.components.filter(
      (x) => x._id === selected_component._id
    )[0];
    addItem({
      ...a,
      _id: id,
      x: selected_component.x + 20,
      y: selected_component.y + 20,
    });
  }

  function addItem(item) {
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        method: "change",
        item: item,
      })
    );
    dispatch(setSelectedComponent(item));
  }

  return (
    <div
      className="header-btn"
      onClick={() => {
        duplicate();
      }}
    >
      <i className="fa-regular fa-copy"></i>
    </div>
  );
}
export function DeleteButton() {
  const dispatch = useDispatch();
  const selected_component = useSelector((state) => state.component);
  const components = useSelector((state) => state.project.components);

  async function deleteItem() {
    const index = components.findIndex(
      (obj) => obj._id === selected_component._id
    );
    dispatch(
      manageElement({
        action: "delete",
        element: "component",
        method: "change",
        item: components[index],
      })
    );
    // dispatch(deleteComponent({ _id: selected_component._id }));
    dispatch(setSelectedComponent({ _id: "", component_type: 0 }));
  }
  return (
    <div
      className="header-btn"
      onClick={() => {
        deleteItem();
      }}
    >
      <i className="fa-solid fa-trash-can"></i>
    </div>
  );
}
