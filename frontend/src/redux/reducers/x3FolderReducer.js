const initial_state = [];

const folders2 = (state = initial_state, action) => {
  if (action.type === "UPDATE_FOLDERS_2") {
    state = [...state, ...action.payload];
  } else if (action.type === "CREATE_FOLDER_2") {
    state = [action.payload, ...state];
  } else if (action.type === "UPDATE_FOLDER_2") {
    const updatedFolders = state.map((obj) =>
      obj._id === action.payload._id ? { ...obj, ...action.payload } : obj
    );
    state = updatedFolders;
  } else if (action.type === "DELETE_FOLDER_2") {
    const folderIdToRemove = action.payload;
    const updatedFolders = state.filter((x) => x._id !== folderIdToRemove);
    state = updatedFolders;
  } else if (action.type === "MOVE_PROJECT_2") {
    const updatedFolders = state.map((obj) =>
      obj._id === action.payload.newFolder._id
        ? { ...obj, ...action.payload.newFolder }
        : obj._id === action.payload.oldFolder._id
        ? { ...obj, ...action.payload.oldFolder }
        : obj
    );
    state = updatedFolders;
  }
  return state;
};

export default folders2;
