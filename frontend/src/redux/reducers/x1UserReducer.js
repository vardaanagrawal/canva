const initial_state = {
  name: "",
  email: "",
  _id: "",
};

const user = (state = initial_state, action) => {
  if (action.type === "SET_USER") {
    state = action.payload;
  }
  return state;
};

export default user;
