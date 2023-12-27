import React from "react";
import { font_styles } from "../utils";
import { addComponent } from "../../../../redux/actions/currentProjectActions";
import {
  setSelectedComponent,
  updateSelectedComponent,
} from "../../../../redux/actions/selectedComponentActions";
import { useDispatch, useSelector } from "react-redux";

export default function TextSidebar() {
  const dispatch = useDispatch();
  function addItem(item) {
    dispatch(addComponent(item));
    dispatch(setSelectedComponent(item));
  }

  const sidebar2 = useSelector((state) => state.sidebar2);
  const selected_component = useSelector((state) => state.selected_component);
  function handleClick(item) {
    if (sidebar2.mode === "new") {
      const id = Math.floor(Math.random() * 900) + 100;
      addItem({
        ...item,
        _id: id,
        component_type: 3,
        text: "Write here...",
        color: "black",
        x: 100,
        y: 100,
        text_bold: false,
        text_italic: false,
        text_underline: false,
      });
    } else {
      dispatch(
        updateSelectedComponent(selected_component._id, {
          font_family: item.font_family,
        })
      );
    }
  }
  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Fonts</div>
      <div className="sidebar2-body font-sidebar-body">
        {font_styles.map((item, index) => (
          <div
            className="font-sidebar-item"
            key={index}
            onClick={() => {
              handleClick(item);
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
            <div
              className="font-name"
              style={{
                fontFamily: item.font_family,
                fontSize: `18px`,
              }}
            >
              {item.font_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
