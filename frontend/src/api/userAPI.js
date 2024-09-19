import axios from "axios";

// const base_url = "http://localhost:4000";
const base_url = "";
const token = localStorage.getItem("Canva_User");

// #######################################################################################################
// get user ##############################################################################################
// #######################################################################################################
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

// #######################################################################################################
// update user ###########################################################################################
// #######################################################################################################
export async function updateUser(data) {
  const res = await axios.put(`${base_url}/api/user`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

// #######################################################################################################
// upload profile photo in cloudinary ####################################################################
// #######################################################################################################
export async function uploadProfilePhotoInCloudinary(userId, img) {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/user/get-signed-preset",
      { public_id: `canva/user/${userId}/profile/photo` }
    );
    const { signature, timestamp } = response.data;
    const formData = new FormData();
    formData.append("file", img);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("upload_preset", "canva");
    formData.append("api_key", "762172289273913");
    formData.append("public_id", `canva/user/${userId}/profile/photo`);

    const uploadResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      formData
    );
    return uploadResponse.data.secure_url;
  } catch (error) {
    console.error(error.response.data.error.message);
  }
}

// #######################################################################################################
// delete user ###########################################################################################
// #######################################################################################################
