import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RedoIcon, UndoIcon } from "../../../../utils/icons";
import { manageElement } from "../../../../redux/actions/x5ProjectActions";

export default function UndoRedo() {
  const dispatch = useDispatch();

  const undo = useSelector((state) => state.undo);
  const redo = useSelector((state) => state.redo);

  function handleUndo() {
    const undoArray = [...undo];
    const task = undoArray.pop();
    dispatch({
      type: "set_undo_array",
      payload: undoArray,
    });
    if (task.action === "update") {
      dispatch(
        manageElement({
          action: "update",
          element: task.element,
          method: "undo",
          prev_state: task.new_state,
          new_state: task.prev_state,
        })
      );
    } else if (task.action === "delete") {
      dispatch(
        manageElement({
          action: "add",
          element: task.element,
          method: "undo",
          item: task.item,
        })
      );
    } else if (task.action === "add") {
      dispatch(
        manageElement({
          action: "delete",
          element: task.element,
          method: "undo",
          item: task.item,
        })
      );
    }
  }
  function handleRedo() {
    const redoArray = [...redo];
    const task = redoArray.pop();
    dispatch({
      type: "set_redo_array",
      payload: redoArray,
    });
    if (task.action === "update") {
      dispatch(
        manageElement({
          action: "update",
          element: task.element,
          method: "redo",
          prev_state: task.new_state,
          new_state: task.prev_state,
        })
      );
    } else if (task.action === "delete") {
      dispatch(
        manageElement({
          action: "add",
          element: task.element,
          method: "redo",
          item: task.item,
        })
      );
    } else if (task.action === "add") {
      dispatch(
        manageElement({
          action: "delete",
          element: task.element,
          method: "redo",
          item: task.item,
        })
      );
    }
  }

  return (
    <div className="undo-redo-btns">
      <div
        className="undo-btn"
        onClick={() => {
          if (undo.length) handleUndo();
        }}
        style={{ color: undo.length ? "white" : "silver" }}
      >
        <UndoIcon />
      </div>
      <div
        className="redo-btn"
        onClick={() => {
          if (redo.length) handleRedo();
        }}
        style={{ color: redo.length ? "white" : "silver" }}
      >
        <RedoIcon />
      </div>
    </div>
  );
}
