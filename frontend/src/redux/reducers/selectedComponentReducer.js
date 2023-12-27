const selected_component = (
  state = {
    component_type: 0,
  },
  action
) => {
  if (action.type === "SET_SELECTED_COMPONENT") {
    state = action.payload;
  }
  return state;
};

export default selected_component;
