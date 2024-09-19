import * as projectApi from "../../api/projectAPI";

export function getProject(projectId) {
  return async function (dispatch) {
    const res = await projectApi.getProject(projectId);
    if (res.success) {
      dispatch({
        type: "set_project",
        payload: res.project,
      });
    }
    return res;
  };
}
// ###########################################################################################
export function getViewProject(projectId) {
  return async function (dispatch) {
    const res = await projectApi.getViewProject(projectId);
    if (res.success) {
      dispatch({
        type: "set_project",
        payload: res.project,
      });
    }
    return res;
  };
}
// ###########################################################################################
export function manageElement(data) {
  return async function (dispatch) {
    dispatch({
      type: `${data.action}_${data.element}`,
      payload: data,
    });
  };
}
// ###########################################################################################
export function changeComponentSize(data) {
  return async function (dispatch) {
    dispatch({
      type: `change_component_size`,
      payload: data,
    });
  };
}
// ###########################################################################################
export function saveProject(img, project) {
  return async function () {
    const res = await projectApi.saveProject2(img, project);
    return res;
  };
}
