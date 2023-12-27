const user = (state = {}, action) => {
  if (action.type === "UPDATE_USER") {
    state = { ...state, ...action.payload };
  }
  return state;
};

export default user;
