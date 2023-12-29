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
