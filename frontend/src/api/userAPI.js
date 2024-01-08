import axios from "axios";

// const base_url = "http://localhost:5000";
const base_url = "";

// get user details
export async function getUser(token) {
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
