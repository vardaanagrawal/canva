import axios from "axios";

// const base_url = `http://localhost:5000`;
const base_url = ``;

// const API = axios.create({ baseURL: "http://localhost:5000/api" });


//-----auth api------------------------------------------------------------------------
export async function signUp(data) {
  const res = await axios.post(`${base_url}/api/auth/signup`, data);
  return res;
}
export async function signIn(data) {
  const res = await axios.post(`${base_url}/api/auth/login`, data);
  return res;
}
export async function verifyEmail(data) {
  const res = await axios.post(`${base_url}/api/auth/verifyEmail`, data);
  return res.data;
}

// ------user api-------------------------------------------------------------
export async function getUser(token) {
  const res = await axios.get(`${base_url}/api/user/${token}`);
  return res.data;
}

// ------project api-----------------------------------------------------------
export async function createNewProject(data) {
  const res = await axios.post(`${base_url}/api/project/create`, data);
  return res.data;
}
export async function getProjectDetails(project_id, user_id) {
  const res = await axios.get(
    `${base_url}/api/project/${project_id}/${user_id}`
  );
  return res.data;
}
export async function saveProject(data) {
  const res = await axios.put(`${base_url}/api/project/save`, data);
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
