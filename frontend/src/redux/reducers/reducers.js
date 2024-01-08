import { combineReducers } from "redux";
import user from "./x1UserReducer";
import projects from "./x2ProjectsReducer";
import folders from "./x3FoldersReducer";
import uploads from "./x4UploadsReducer";
import project from "./x5ProjectReducer";
import component from "./x6ComponentReducer";
import sidebar2 from "./x7Sidebar2Reducer";
import { undo, redo } from "./x8UndoRedoReducer";

const reducers = combineReducers({
  user: user,
  projects,
  folders,
  uploads,
  project,
  component,
  sidebar2,
  undo,
  redo,
});

export default reducers;
