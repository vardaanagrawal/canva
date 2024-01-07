const initial_state = {
  name: "",
  email: "",
  _id: "",
};

const user2 = (state = initial_state, action) => {
  if (action.type === "UPDATE_USER_2") {
    state = {
      _id: action.payload._id,
      name: action.payload.name,
      email: action.payload.email,
    };
  }
  return state;
};

export default user2;
