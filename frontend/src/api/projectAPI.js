import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("Canva_User");

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
// move project to different folder -------------------------------------------
export async function moveProject(data) {
    const res = await axios.put(`${base_url}/api/project/move`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
}

// save a project ---------------------------------------------------------
export async function saveProject(data) {
  const res = await axios.put(`${base_url}/api/project`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}