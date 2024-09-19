import axios from "axios";

// const base_url = "http://localhost:4000";
const base_url = "";
const token = localStorage.getItem("Canva_User");

export async function uploadImage(userId, data) {
  const imageId = `custom_id_${Date.now()}`;
  const response = await axios.post(
    "http://localhost:4000/api/user/get-signed-preset",
    { public_id: `canva/user/${userId}/uploads/${imageId}` }
  );
  const { signature, timestamp } = response.data;
  const formData = new FormData();
  formData.append("file", data);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("upload_preset", "canva");
  formData.append("api_key", "762172289273913");
  formData.append("public_id", `canva/user/${userId}/uploads/${imageId}`);

  const cloudinary_response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
    formData
  );
  const res = await axios.post(
    `${base_url}/api/upload`,
    {
      name: data.name,
      cloudinary_public_id: cloudinary_response.data.public_id,
      url: cloudinary_response.data.secure_url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export async function deleteUpload(data) {
  const res = await axios.post(`${base_url}/api/upload/delete`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function moveUpload(data) {
  const res = await axios.put(`${base_url}/api/upload/move`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function updateUpload(data) {
  const res = await axios.put(`${base_url}/api/upload`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
