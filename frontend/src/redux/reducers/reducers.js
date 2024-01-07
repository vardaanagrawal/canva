import { combineReducers } from "redux";
import user from "./userReducer";
import current_project from "./projectReducer";
import selected_component from "./selectedComponentReducer";
import sidebar2 from "./sidebar2Reducer";
import { undo, redo } from "./undoRedoReducer";

// ==========================================================
import user2 from "./x1UserReducer";
import projects2 from "./x2ProjectReducer";
import folders2 from "./x3FolderReducer";
import uploads2 from "./x4UploadsReducer";

const reducers = combineReducers({
  // user,
  current_project,
  selected_component,
  sidebar2,
  undo,
  redo,
  // ========================================================
  user: user2,
  projects: projects2,
  folders: folders2,
  uploads: uploads2,
});

export default reducers;
