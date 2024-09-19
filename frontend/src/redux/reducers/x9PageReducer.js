const page = (state = {}, action) => {
  // ---------------------------------------------------------------------------------------------
  // page -------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------
  if (action.type === "set_project") {
    const first_page = action.payload.pages.filter(
      (x) => x.page_number === 1
    )[0];
    state = first_page;
  } else if (action.type === "set_page") {
    state = action.payload;
  } else if (action.type === "add_page") {
    state = action.payload;
  } else if (action.type === "update_page") {
    state = { ...state, ...action.payload.new_state };
  } else if (action.type === "update_page_notes") {
    state = { ...state, ...action.payload.new_state };
  } else if (action.type === "delete_page") {
    state = {};
  }
  // ---------------------------------------------------------------------------------------------
  // component -----------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------
  else if (action.type === "add_component") {
    state.components.push(action.payload.item);
  } else if (action.type === "update_component") {
    const component_id = action.payload.prev_state._id;
    const component_index = state.components.findIndex(
      (obj) => obj._id === component_id
    );
    const updatedComponents = [
      ...state.components.slice(0, component_index),
      { ...state.components[component_index], ...action.payload.new_state },
      ...state.components.slice(component_index + 1),
    ];
    state = {
      ...state,
      components: updatedComponents,
    };
  } else if (action.type === "delete_component") {
    const component_id = action.payload.item._id;
    const components = state.components.filter(
      (obj) => obj._id !== component_id
    );
    state = {
      ...state,
      components,
    };
  } else if (action.type === "change_component_size") {
    const component_id = action.payload._id;
    const component_index = state.components.findIndex(
      (obj) => obj._id === component_id
    );
    const updatedComponents = [
      ...state.components.slice(0, component_index),
      { ...state.components[component_index], ...action.payload },
      ...state.components.slice(component_index + 1),
    ];
    state = {
      ...state,
      components: updatedComponents,
    };
  }
  return state;
};

export default page;
