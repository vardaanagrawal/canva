const initial_state = [];

const uploads = (state = initial_state, action) => {
  if (action.type === "SET_UPLOADS") {
    state = [...state, ...action.payload];
  }
  return state;
};

export default uploads;
