import axios from "axios";

// const base_url = `http://localhost:5000`;
const base_url = ``;

//-----auth api------------------------------------------------------------------------
export async function signup(data) {
  const res = await axios.post(`${base_url}/auth/signup`, data);
  return res.data;
}

export async function login(data) {
  const res = await axios.post(`${base_url}/auth/login`, data);
  return res.data;
}

export async function verifyEmail(data) {
  const res = await axios.post(`${base_url}/auth/verifyEmail`, data);
  return res.data;
}

// ------user api-------------------------------------------------------------
export async function getUser(id) {
  const res = await axios.get(`${base_url}/user/${id}`);
  return res.data;
}

// ------project api-----------------------------------------------------------
export async function createNewProject(data) {
  const res = await axios.post(`${base_url}/project/create`, data);
  return res.data;
}
export async function getProjectDetails(id) {
  const res = await axios.get(`${base_url}/project/${id}`);
  return res.data;
}
export async function saveProject(data) {
  const res = await axios.put(`${base_url}/project/save`, data);
  return res.data;
}
