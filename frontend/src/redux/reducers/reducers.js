import { combineReducers } from "redux";
import user from "./userReducer";
import current_project from "./projectReducer";
import selected_component from "./selectedComponentReducer";
import sidebar2 from "./sidebar2Reducer";
import { undo, redo } from "./undoRedoReducer";

const reducers = combineReducers({
  user,
  current_project,
  selected_component,
  sidebar2,
  undo,
  redo
});

export default reducers;
