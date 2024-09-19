const initial_state = {
  name: "",
  email: "",
  _id: "",
  profile_pic: "",
};

const user = (state = initial_state, action) => {
  if (action.type === "SET_USER") {
    state = action.payload;
  } else if (action.type === "UPDATE_USER") {
    state = {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

export default user;
