import axios from "axios";

// const base_url = "http://localhost:5000";
const base_url = "";

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
