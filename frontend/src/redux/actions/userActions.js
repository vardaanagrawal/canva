export function updateUserDetails(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_USER",
      payload: data,
    });
  };
}
