import axios from "axios";

const base_url = process.env.REACT_APP_API_BASE_URL;
const token = localStorage.getItem("Canva_User");

// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// axios.defaults.headers.common["Content-Type"] = "application/json";

// get user details
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
