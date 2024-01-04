import * as api from "../../api";

export function createNewProject(projectData, navigate, setLoading) {
  return async function (dispatch) {
    try {
      const { data } = await api.createNewProject(projectData);
      setLoading(-1);
      if (data.success) {
        dispatch({
          type: "CREATE_PROJECT",
          payload: data.project_details,
        });
        navigate(`/design/${data.project_details._id}/edit`);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.data);
      return;
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
          type: "DELETE_PROJECT",
          payload: projectId,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      //   console.log(err);
      alert(err.response.data);
    }
  };
}
