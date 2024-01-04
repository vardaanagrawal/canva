const current_project = (state = {}, action) => {
  if (action.type === "UPDATE_CURRENT_PROJECT") {
    state = action.payload;
  } else if (action.type === "update_canvas") {
    state = {
      ...state,
      canvas: { ...state.canvas, ...action.payload.new_state },
    };
  } else if (action.type === "add_component") {
    state = {
      ...state,
      components: [
        ...state.components,
        { ...action.payload.item, isNew: true },
      ],
    };
  } else if (action.type === "delete_component") {
    const component_id = action.payload.item._id;
    const index = state.components.findIndex((obj) => obj._id === component_id);
    const updatedComponents = [
      ...state.components.slice(0, index), // elements before the deleted component
      ...state.components.slice(index + 1), // elements after the deleted component
    ];
    state = {
      ...state,
      components: updatedComponents,
    };
  } else if (action.type === "update_component") {
    const component_id = action.payload.prev_state._id;
    const index = state.components.findIndex((obj) => obj._id === component_id);
    const updatedComponents = [
      ...state.components.slice(0, index), // elements before the updated component
      { ...state.components[index], ...action.payload.new_state }, // updated component
      ...state.components.slice(index + 1), // elements after the updated component
    ];
    state = {
      ...state,
      components: updatedComponents,
    };
  }
  return state;
};

export default current_project;
