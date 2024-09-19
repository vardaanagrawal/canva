import * as api from "../../api/projectAPI";

export function createNewProject(projectData) {
  return async function (dispatch) {
    try {
      const { data } = await api.createNewProject(projectData);
      if (data.success) {
        dispatch({
          type: "CREATE_PROJECT",
          payload: data.project,
        });
        window.open(`/design/${data.project._id}/edit`, "_blank");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.statusText);
    }
  };
}

export function copyProject(projectId) {
  return async function (dispatch) {
    try {
      const { data } = await api.copyProject({ projectId });
      if (data.success) {
        dispatch({
          type: "CREATE_PROJECT",
          payload: data.project,
        });
      } else {
        alert(data.message);
      }
      return data;
    } catch (err) {
      alert(err.response.statusText);
      return { success: false };
    }
  };
}

export function deleteProject(project) {
  return async function (dispatch) {
    try {
      const { data } = await api.deleteProject(project._id);
      if (data.success) {
        dispatch({
          type: "DELETE_PROJECT",
          payload: { projectId: project._id, folderId: project.folder._id },
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.statusText);
    }
  };
}

export function moveProject(projectData) {
  return async function (dispatch) {
    try {
      const { data } = await api.moveProject(projectData);
      if (data.success) {
        dispatch({
          type: "MOVE_PROJECT",
          payload: data,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
}

export function updateProject(item) {
  return async function (dispatch) {
    try {
      const { data } = await api.updateProject(item);
      if (data.success) {
        dispatch({
          type: "UPDATE_PROJECT",
          payload: item,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      clearTimeout(err.response.data);
    }
  };
}

export function setPage(item) {
  return async function (dispatch) {
    dispatch({
      type: "set_page",
      payload: item,
    });
  };
}
