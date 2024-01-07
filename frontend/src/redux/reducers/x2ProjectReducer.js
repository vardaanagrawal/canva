const initial_state = [];

const projects2 = (state = initial_state, action) => {
  if (action.type === "UPDATE_PROJECTS_2") {
    state = [...state, ...action.payload];
  } else if (action.type === "CREATE_PROJECT_2") {
    state = [action.payload, ...state];
  } else if (action.type === "DELETE_PROJECT_2") {
    const projectIdToRemove = action.payload;
    const updatedProjects = state.filter((x) => x._id !== projectIdToRemove);
    state = updatedProjects;
  } else if (action.type === "MOVE_PROJECT_2") {
    const updatedProjects = state.map((obj) =>
      obj._id === action.payload.project._id
        ? { ...obj, ...action.payload.project }
        : obj
    );
    state = updatedProjects;
  }
  return state;
};

export default projects2;
