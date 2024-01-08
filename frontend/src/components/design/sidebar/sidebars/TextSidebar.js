import React from "react";
import { setSelectedComponent } from "../../../../redux/actions/x6ComponentActions";
import { useDispatch, useSelector } from "react-redux";
import { font_styles } from "../utils";
import { manageElement } from "../../../../redux/actions/x5ProjectActions";

export default function TextSidebar() {
  const dispatch = useDispatch();
  const sidebar2 = useSelector((state) => state.sidebar2);
  const selected_component = useSelector((state) => state.component);
  const components = useSelector((state) => state.project.components);

  function handleClick(item) {
    // if new text box is to be added
    if (sidebar2.mode === "new") {
      // creating a temp id for the new text box
      const id = Math.floor(Math.random() * 900) + 100;
      addItem({
        ...item,
        _id: id,
        component_type: 3,
        text: "Write here...",
        font_color: "black",
        x: 100,
        y: 100,
        text_bold: false,
        text_italic: false,
        text_underline: false,
        height: 150,
        width: 250,
      });
    }
    // if font family of the existing text box is to be changed
    else {
      // dispatch(
      //   updateSelectedComponent(selected_component._id, {
      //     font_family: item.font_family,
      //   })
      // );
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
            font_family: item.font_family,
          },
        })
      );
    }
  }

  function addItem(item) {
    // adding the component in the components array of the current project
    // dispatch(addComponent(item));
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
      <div className="sidebar2-title">
        {sidebar2.mode === "new" ? "Add New Textbox" : "Update Font"}
      </div>
      <div className="sidebar2-body font-sidebar-body">
        {font_styles.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleClick(item);
            }}
            className="font-sidebar-item"
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
