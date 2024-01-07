export function updateUserDetails(data) {
  return async function (dispatch) {
    dispatch({ type: "UPDATE_USER", payload: data });
    dispatch({ type: "UPDATE_USER_2", payload: data });
    dispatch({ type: "UPDATE_PROJECTS_2", payload: data.projects });
    dispatch({ type: "UPDATE_FOLDERS_2", payload: data.folders });
    dispatch({ type: "UPDATE_UPLOADS_2", payload: data.uploads });
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
