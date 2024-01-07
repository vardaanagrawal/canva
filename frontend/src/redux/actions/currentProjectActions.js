import domtoimage from "dom-to-image-more";
import axios from "axios";
import * as api from "../../api";
import * as projectApi from "../../api/projectAPI";

export function updateCurrentProject(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_CURRENT_PROJECT",
      payload: data,
    });
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
// ##########################################################################################

async function createThumbnail() {
  const formData = new FormData();

  var node = document.querySelector(".canvas");
  await domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      const base64Data = dataUrl.split(",")[1];
      const binaryData = atob(base64Data);
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: "image/png" }); // Adjust the type accordingly
      const file = new File([blob], "filename.png", { type: "image/png" }); // Adjust the filename and type accordingly
      formData.append("file", file);
      formData.append("upload_preset", "hddvzsci");
      formData.append("folder", "canva");
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dg1awjvew/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const thumbnail = res.data.secure_url;
  return thumbnail;
}

// ###########################################################################################
export function saveProject(project, setSaving) {
  return async function (dispatch) {
    // --------------------------------------------------------
    // creating thumbnail for the project
    // --------------------------------------------------------
    const thumbnail = await createThumbnail();
    console.log(thumbnail);
    const res = await projectApi.saveProject({
      ...project,
      thumbnail,
    });
    console.log(res);
    setSaving(false);
  };
}

export function updateNotes(data) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_NOTES",
      payload: data,
    });
  };
}
