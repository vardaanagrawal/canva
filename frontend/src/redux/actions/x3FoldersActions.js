import * as api from "../../api";

export function createNewFolder(folderData) {
  return async function (dispatch) {
    try {
      const { data } = await api.createFolder(folderData);
      if (data.success) {
        dispatch({
          type: "CREATE_FOLDER",
          payload: data.folder,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.statusText);
    }
  };
}

export function updateFolder(folderId, updatedFields) {
  return async function (dispatch) {
    try {
      const { data } = await api.updateFolder(folderId, updatedFields);
      if (data.success) {
        dispatch({
          type: "UPDATE_FOLDER",
          payload: data.folder,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.statusText);
    }
  };
}

export function deleteFolder(folderId) {
  return async function (dispatch) {
    try {
      const { data } = await api.deleteFolder(folderId);
      if (data.success) {
        dispatch({
          type: "DELETE_FOLDER",
          payload: folderId,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert(err.response.statusText);
    }
  };
}
