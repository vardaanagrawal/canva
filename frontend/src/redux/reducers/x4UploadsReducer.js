const initial_state = [];

const uploads2 = (state = initial_state, action) => {
  if (action.type === "UPDATE_UPLOADS_2") {
    state = [...state, ...action.payload];
  }
  return state;
};

export default uploads2;
