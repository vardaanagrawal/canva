import axios from "axios";

// const base_url = "http://localhost:4000";
const base_url = "";
const token = localStorage.getItem("Canva_User");

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
// ----- updating folder ---------------------------------------------------
export async function updateFolder(folderId, data) {
  const res = await axios.put(`${base_url}/api/folder/${folderId}`, data, {
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
