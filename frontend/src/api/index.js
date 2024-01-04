import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("Canva_User");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

// ------user api-------------------------------------------------------------
export async function getUser() {
  try {
    const res = await axios.get(`${base_url}/api/user`);
    return res.data;
  } catch (err) {
    return { success: false };
  }
}

// ------project api-----------------------------------------------------------
// creating new project -------------------------------------------------------
export async function createNewProject(data) {
  const res = await axios.post(`${base_url}/api/project`, data);
  return res;
}
// updating a project ---------------------------------------------------------
export async function saveProject(data) {
  const res = await axios.put(`${base_url}/api/project`, data);
  return res.data;
}
// deleting the project -------------------------------------------------------
export async function deleteProject(project_id) {
  const res = await axios.delete(`${base_url}/api/project/${project_id}`);
  return res;
}
// move project to different folder -------------------------------------------
export async function moveProject(projectId, folderId) {
  const res = await axios.put(`${base_url}/api/project/move`, {
    projectId,
    folderId,
  });
  return res.data;
}

// ----------------------------------------------------------------------------
export async function getProjectDetails(project_id, user_id) {
  const res = await axios.get(
    `${base_url}/api/project/${project_id}/${user_id}`
  );
  return res.data;
}
export async function getProject(project_id) {
  const res = await axios.get(`${base_url}/api/project/${project_id}`);
  return res.data;
}

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

// ----- folder api --------------------------------------------------------

export async function createFolder(data) {
  const res = await axios.post(`${base_url}/api/folder/create`, data);
  return res.data;
}

export async function updateFolder(data) {
  const res = await axios.put(`${base_url}/api/folder/update`, data);
  return res.data;
}

export async function deleteFolder(data) {
  const res = await axios.delete(`${base_url}/api/folder/${data.id}`);
  return res.data;
}
