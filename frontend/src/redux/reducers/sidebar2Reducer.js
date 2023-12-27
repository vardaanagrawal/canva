const sidebar2 = (
  state = {
    visible: false,
  },
  action
) => {
  if (action.type === "SHOW_SIDEBAR2") {
    state = action.payload;
  }
  return state;
};

export default sidebar2;
