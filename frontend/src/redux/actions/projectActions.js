import * as api from "../../api";

export function createNewProject(projectData, navigate, setLoading) {
  return async function (dispatch) {
    try {
      const { data } = await api.createNewProject(projectData);
      setLoading(-1);
      if (data.success) {
        dispatch({
          type: "CREATE_PROJECT_2",
          payload: data.project,
        });
        navigate(`/design/${data.project_details._id}/edit`);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
}

export function deleteProject(projectId, setDeleting, setOpenOptionsBox) {
  return async function (dispatch) {
    try {
      const { data } = await api.deleteProject(projectId);
      setDeleting(false);
      if (data.success) {
        setOpenOptionsBox(false);
        dispatch({
          type: "DELETE_PROJECT_2",
          payload: projectId,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
}

export function moveProject(projectData, setMoving) {
  return async function (dispatch) {
    try {
      const { data } = await api.moveProject(projectData);
      setMoving(false);
      if (data.success) {
        dispatch({
          type: "MOVE_PROJECT_2",
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
