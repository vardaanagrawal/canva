export function showSidebar2(data) {
  return async function (dispatch) {
    dispatch({
      type: "SHOW_SIDEBAR2",
      payload: data,
    });
  };
}
