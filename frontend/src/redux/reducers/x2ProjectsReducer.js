const initial_state = [];

const projects = (state = initial_state, action) => {
  if (action.type === "SET_PROJECTS") {
    state = action.payload;
  }
  // ----------------------------------------------------------------------------
  else if (action.type === "CREATE_PROJECT") {
    state = [...state, action.payload];
  }
  // ----------------------------------------------------------------------------
  else if (action.type === "DELETE_PROJECT") {
    const projectIdToRemove = action.payload.projectId;
    const updatedProjects = state.filter((x) => x._id !== projectIdToRemove);
    state = updatedProjects;
  }
  // ----------------------------------------------------------------------------
  else if (action.type === "MOVE_PROJECT") {
    const updatedProjects = state.map((obj) =>
      obj._id === action.payload.project._id
        ? { ...obj, folder: action.payload.newFolder }
        : obj
    );
    state = updatedProjects;
  }
  // ----------------------------------------------------------------------------
  else if (action.type === "UPDATE_PROJECT") {
    const updatedProjects = state.map((obj) =>
      obj._id === action.payload.project_id
        ? { ...obj, name: action.payload.name }
        : obj
    );
    state = updatedProjects;
  }
  // ----------------------------------------------------------------------------
  else if (action.type === "DELETE_FOLDER") {
    const updatedProjects = state.map((obj) =>
      obj.folder && obj.folder._id === action.payload
        ? { ...obj, folder: null }
        : obj
    );
    state = updatedProjects;
  }
  return state;
};

export default projects;
