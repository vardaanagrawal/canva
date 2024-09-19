export function setSelectedComponent(data) {
  return async function (dispatch) {
    dispatch({
      type: "set_component",
      payload: data,
    });
  };
}
