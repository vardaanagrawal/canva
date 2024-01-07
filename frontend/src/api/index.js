import axios from "axios";

// const base_url = process.env.REACT_APP_API_BASE_URL;
const base_url = "";
const token = localStorage.getItem("Canva_User");



// ----------------------------------------------------------------------------
export async function getProjectDetails(project_id, user_id) {
  const res = await axios.get(
    `${base_url}/api/project/${project_id}/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export async function getProject(project_id) {
  const res = await axios.get(`${base_url}/api/project/${project_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// ----- folder api --------------------------------------------------------
// ----- creating new folder -----------------------------------------------
export async function createFolder(data) {
  const res = await axios.post(`${base_url}/api/folder`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
// ----- deleting folder ---------------------------------------------------
export async function deleteFolder(folderId) {
  const res = await axios.delete(`${base_url}/api/folder/${folderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
// ----- updating folder ---------------------------------------------------
export async function updateFolder(folderId, data) {
  const res = await axios.put(`${base_url}/api/folder/${folderId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

// ----------------------------------------------------------------------------
// ----- upload images --------------------------------------------------------

export async function uploadImg(imgData) {
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dg1awjvew/upload",
    imgData
  );
  return response.data;
}

export async function updateImageInDb(id, img) {
  const res = await axios.post(`${base_url}/api/project/upload/image`, {
    id,
    img,
  });
  return res.data;
}
