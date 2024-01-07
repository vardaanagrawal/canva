import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("Canva_User");

// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// axios.defaults.headers.common["Content-Type"] = "application/json";

// ------user api-------------------------------------------------------------
export async function getUser() {
  try {
    const res = await axios.get(`${base_url}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return { success: false };
  }
}

// ------project api-----------------------------------------------------------
// creating new project -------------------------------------------------------
export async function createNewProject(data) {
  const res = await axios.post(`${base_url}/api/project`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
// deleting the project -------------------------------------------------------
export async function deleteProject(project_id) {
  const res = await axios.delete(`${base_url}/api/project/${project_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
// updating a project ---------------------------------------------------------
export async function saveProject(data) {
  const res = await axios.put(`${base_url}/api/project`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
// move project to different folder -------------------------------------------
export async function moveProject(data) {
  const res = await axios.put(`${base_url}/api/project/move`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

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
