const user = (state = {}, action) => {
  if (action.type === "UPDATE_USER") {
    state = { ...state, ...action.payload };
  } else if (action.type === "CREATE_PROJECT") {
    state = { ...state, projects: [action.payload, ...state.projects] };
  } else if (action.type === "DELETE_PROJECT") {
    const updatedProjects = state.projects.filter(
      (x) => x._id != action.payload
    );
    state = { ...state, projects: updatedProjects };
  } else if (action.type === "UPDATE_UPLOADS") {
    state = { ...state, uploads: [...state.uploads, action.payload] };
  } else if (action.type === "UPDATE_FOLDER") {
    const index = state.folders.findIndex(
      (obj) => obj._id === action.payload.id
    );
    const updatedFolders = [
      ...state.folders.slice(0, index), // elements before the updated folder
      { ...state.folders[index], starred: action.payload.starred }, // updated folder
      ...state.folders.slice(index + 1), // elements after the updated folder
    ];
    state = { ...state, folders: updatedFolders };
  } else if (action.type === "UPDATE_FOLDERS") {
    state = { ...state, folders: action.payload };
  }
  return state;
};

export default user;
