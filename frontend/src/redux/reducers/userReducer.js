const user = (state = {}, action) => {
  if (action.type === "UPDATE_USER") {
    state = { ...state, ...action.payload };
  } else if (action.type === "UPDATE_UPLOADS") {
    state = { ...state, uploads: [...state.uploads, action.payload] };
  }
  return state;
};

export default user;
