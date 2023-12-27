export function updateCurrentProject(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_CURRENT_PROJECT",
      payload: data,
    });
  };
}

export function updateCanvasData(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_CANVAS_DATA",
      payload: data,
    });
  };
}

export function updateProjectName(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_PROJECT_NAME",
      payload: data,
    });
  };
}

export function addComponent(data) {
  return async function (dispatch) {
    dispatch({
      type: "ADD_COMPONENT",
      payload: data,
    });
  };
}

export function deleteComponent(data) {
  return async function (dispatch) {
    dispatch({
      type: "DELETE_COMPONENT",
      payload: data,
    });
  };
}
