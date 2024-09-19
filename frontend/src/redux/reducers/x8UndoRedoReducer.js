const undo = (state = [], action) => {
  if (action.type === "set_undo_array") {
    state = action.payload;
  }
  if (action.payload && action.payload.method !== "undo") {
    if (action.type === "update_page") {
      state.push(action.payload);
    } else if (action.type === "add_component") {
      state.push(action.payload);
    } else if (action.type === "delete_component") {
      state.push(action.payload);
    } else if (action.type === "update_component") {
      state.push(action.payload);
    }
  }
  return state;
};
const redo = (state = [], action) => {
  if (action.type === "set_redo_array") {
    state = action.payload;
  }
  if (
    action.type === "update_page" ||
    action.type === "add_component" ||
    action.type === "delete_component" ||
    action.type === "update_component"
  ) {
    if (action.payload && action.payload.method === "undo") {
      state = [...state, action.payload];
    } else if (
      action.payload.method !== "undo" &&
      action.payload.method !== "redo"
    ) {
      state = [];
    }
  }
  return state;
};

export { undo, redo };
