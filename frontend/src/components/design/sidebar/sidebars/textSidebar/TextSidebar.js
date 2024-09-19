import React from "react";
import "./textSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { font_styles } from "../../resources/fonts";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";

import { v4 as uuidv4 } from "uuid";

export default function TextSidebar() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  function handleClick(item) {
    // creating a temp id for the new text box
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        item: {
          _id: id,
          component_type: "text",
          height: 150,
          width: 250,
          x: 100,
          y: 100,
          zIndex: page.components.length + 1,
          page_id: page._id,
          ...item,
        },
      })
    );
  }

  const tb = {
    text: "Your paragraph text",
    font_family: "'Staatliches', sans-serif",
    font_name: "Staatliches",
    font_size: 52,
    color: "black",
    bold: "normal",
    italic: "normal",
    underline: "none",
    text_align: "center",
    text_outline: "", // webkit_text_stroke
    text_shadow: "",
    width: 400,
  };

  const h1 = {
    text: "Add a heading",
    font_family: "'Staatliches', sans-serif",
    font_name: "Staatliches",
    font_size: 72,
    color: "black",
    bold: "bold",
    italic: "normal",
    underline: "none",
    text_align: "center",
    text_outline: "", // webkit_text_stroke
    text_shadow: "",
    width: 400,
  };
  const h2 = {
    text: "Add a subheading",
    font_family: "'Staatliches', sans-serif",
    font_name: "Staatliches",
    font_size: 62,
    color: "black",
    bold: "bold",
    italic: "normal",
    underline: "none",
    text_align: "center",
    text_outline: "", // webkit_text_stroke
    text_shadow: "",
    width: 400,
  };
  const h3 = {
    text: "Add a body text",
    font_family: "'Staatliches', sans-serif",
    font_name: "Staatliches",
    font_size: 52,
    color: "black",
    bold: "normal",
    italic: "normal",
    underline: "none",
    text_align: "center",
    text_outline: "", // webkit_text_stroke
    text_shadow: "",
    width: 400,
  };

  return (
    <div className="elements-sidebar">
      <div
        className="add-text-btn"
        onClick={() => {
          handleClick(tb);
        }}
      >
        Add a text box
      </div>
      <div className="text-sidebar-title">Default text boxes</div>
      <div
        className="def-text-btn-1"
        onClick={() => {
          handleClick(h1);
        }}
      >
        Add a heading
      </div>
      <div
        className="def-text-btn-2"
        onClick={() => {
          handleClick(h2);
        }}
      >
        Add a subheading
      </div>
      <div
        className="def-text-btn-3"
        onClick={() => {
          handleClick(h3);
        }}
      >
        Add a body text
      </div>
      <div className="text-sidebar-title">Font styles</div>
      <div className="text-sidebar-body">
        {font_styles.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(item);
            }}
            className="text-sidebar-item"
            style={{
              fontFamily: item.font_family,
              fontSize: item.font_size,
              color: item.color,
              fontWeight: item.bold,
              textStyle: item.italic,
              textDecoration: item.underline,
              textAlign: item.text_align,
              WebkitTextStroke: item.text_outline,
              textShadow: item.text_shadow,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
