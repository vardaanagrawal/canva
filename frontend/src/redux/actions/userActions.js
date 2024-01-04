export function updateUserDetails(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_USER",
      payload: data,
    });
  };
}

export function updateUploads(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_UPLOADS",
      payload: data,
    });
  };
}

export function updateFolderData(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_FOLDER",
      payload: data,
    });
  };
}

export function updateFolders(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_FOLDERS",
      payload: data,
    });
  };
}
