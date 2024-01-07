import * as api from "../../api";

export function createNewFolder(folderData, setLoading, setProjectModal) {
  return async function (dispatch) {
    try {
      const { data } = await api.createFolder(folderData);
      setLoading(false);
      setProjectModal(false);
      if (data.success) {
        dispatch({
          type: "CREATE_FOLDER_2",
          payload: data.folder,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
}

export function updateFolder(folderId, updatedFields, setStarring) {
  return async function (dispatch) {
    try {
      const { data } = await api.updateFolder(folderId, updatedFields);
      setStarring(false);
      if (data.success) {
        dispatch({
          type: "UPDATE_FOLDER_2",
          payload: data.folder,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
}

export function deleteFolder(folderId, setDeleting) {
  return async function (dispatch) {
    try {
      const { data } = await api.deleteFolder(folderId);
      setDeleting(false);
      if (data.success) {
        dispatch({
          type: "DELETE_FOLDER_2",
          payload: folderId,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.data);
    }
  };
}
