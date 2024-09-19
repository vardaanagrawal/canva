import * as api from "../../api/uploadAPI";

export function uploadImage(userId, data) {
  return async function (dispatch) {
    const res = await api.uploadImage(userId, data);
    if (res.success) {
      dispatch({
        type: "SET_UPLOADS",
        payload: res.uploads,
      });
    } else {
      alert(res.message);
    }
    return res;
  };
}

export function deleteUpload(data) {
  return async function (dispatch) {
    const res = await api.deleteUpload(data);
    if (res.success) {
      dispatch({
        type: "delete_upload",
        payload: data,
      });
    } else {
      alert(res.message);
    }
    return res;
  };
}

export function moveUpload(data) {
  return async function (dispatch) {
    const res = await api.moveUpload(data);
    if (res.success) {
      dispatch({
        type: "move_upload",
        payload: res.upload,
      });
    } else {
      alert(res.message);
      return res;
    }
  };
}

export function updateUpload(data) {
  return async function (dispatch) {
    const res = await api.updateUpload(data);
    if (res.success) {
      dispatch({
        type: "update_upload",
        payload: data,
      });
    } else {
      alert(res.message);
      return res;
    }
  };
}
