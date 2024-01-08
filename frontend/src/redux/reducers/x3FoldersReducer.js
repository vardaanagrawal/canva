const initial_state = [];

const folders = (state = initial_state, action) => {
  if (action.type === "SET_FOLDERS") {
    state = [...state, ...action.payload];
  } else if (action.type === "CREATE_FOLDER") {
    state = [action.payload, ...state];
  } else if (action.type === "UPDATE_FOLDER") {
    const updatedFolders = state.map((obj) =>
      obj._id === action.payload._id ? { ...obj, ...action.payload } : obj
    );
    state = updatedFolders;
  } else if (action.type === "DELETE_FOLDER") {
    const folderIdToRemove = action.payload;
    const updatedFolders = state.filter((x) => x._id !== folderIdToRemove);
    state = updatedFolders;
  } else if (action.type === "MOVE_PROJECT") {
    const updatedFolders = state.map((obj) =>
      action.payload.newFolder && obj._id === action.payload.newFolder._id
        ? action.payload.newFolder
        : action.payload.oldFolder && obj._id === action.payload.oldFolder._id
        ? action.payload.oldFolder
        : obj
    );
    state = updatedFolders;
  } else if (action.type === "DELETE_PROJECT") {
    const targetFolder = state.find((folder) => folder._id === action.payload.folderId);
    if (targetFolder) {
      targetFolder.projects = targetFolder.projects.filter(
        (project) => project !== action.payload.projectId
      );
    }
  }
  return state;
};

export default folders;
