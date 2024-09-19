const initial_state = "light";
const theme = (state = initial_state, action) => {
  if (action.type === "CHANGE_THEME") {
    state = action.payload;
  }
  return state;
};

export default theme;
