const initial_state = [];

const uploads = (state = initial_state, action) => {
  if (action.type === "SET_UPLOADS") {
    state = action.payload;
  } else if (action.type === "delete_upload") {
    state = state.filter((x) => x._id !== action.payload._id);
  } else if (action.type === "move_upload") {
    const updatedData = state.map((item) =>
      item._id === action.payload._id ? action.payload : item
    );
    state = updatedData;
  } else if (action.type === "DELETE_FOLDER") {
    const updatedUploads = state.map((obj) =>
      obj.folder && obj.folder._id === action.payload
        ? { ...obj, folder: null }
        : obj
    );
    state = updatedUploads;
  } else if (action.type === "update_upload") {
    const updatedUploads = state.map((obj) =>
      obj && obj._id === action.payload._id
        ? { ...obj, ...action.payload }
        : obj
    );
    state = updatedUploads;
  }
  return state;
};

export default uploads;
