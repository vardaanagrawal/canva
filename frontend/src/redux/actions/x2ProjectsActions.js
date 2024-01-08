import * as api from "../../api/projectAPI";

export function createNewProject(projectData, navigate) {
  return async function (dispatch) {
    try {
      const { data } = await api.createNewProject(projectData);
      if (data.success) {
        dispatch({
          type: "CREATE_PROJECT",
          payload: data.project,
        });
        navigate(`/design/${data.project._id}/edit`);
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
    } catch (err) {
      alert(err.response.statusText);
    }
  };
}

export function deleteProject(project) {
  return async function (dispatch) {
    try {
      const { data } = await api.deleteProject(project._id);
      console.log(data);
      if (data.success) {
        dispatch({
          type: "DELETE_PROJECT",
          payload: { projectId: project._id, folderId: project.folder },
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
