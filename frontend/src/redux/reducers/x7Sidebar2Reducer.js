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

const designView = (state = "page", action) => {
  if (action.type === "set_design_view") {
    state = action.payload;
  }
  return state;
};

module.exports = { sidebar2, designView };
// export default sidebar2;
