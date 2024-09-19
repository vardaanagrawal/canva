const initial_state = {
  component_type: "body",
};

const component = (state = initial_state, action) => {
  if (action.type === "set_component") {
    state = action.payload;
  } else if (action.type === "add_component") {
    state = action.payload.item;
  } else if (action.type === "delete_component") {
    state = initial_state;
  } else if (action.type === "update_component") {
    state = { ...state, ...action.payload.new_state };
  } else if (action.type === "change_component_size") {
    state = { ...state, ...action.payload };
  }
  return state;
};

export default component;
