import axios from "axios";

// const base_url = "http://localhost:4000";
const base_url = "";
const token = localStorage.getItem("Canva_User");

// #####################################################################################################
// creating new project ################################################################################
// #####################################################################################################
export async function createNewProject(data) {
  const res = await axios.post(`${base_url}/api/project`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

// #####################################################################################################
// copy project ########################################################################################
// #####################################################################################################
export async function copyProject(data) {
  const res = await axios.post(`${base_url}/api/project/copy`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

// #####################################################################################################
// delete project ######################################################################################
// #####################################################################################################
export async function deleteProject(project_id) {
  const res = await axios.delete(`${base_url}/api/project/${project_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

// #####################################################################################################
// MOVE PROJECT ########################################################################################
// #####################################################################################################
export async function moveProject(data) {
  const res = await axios.put(`${base_url}/api/project/move`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

// #####################################################################################################
// UPDATE_PROJECT ######################################################################################
// #####################################################################################################
export async function updateProject(data) {
  const res = await axios.put(`${base_url}/api/project/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

// #####################################################################################################
// DESIGN ONLY #########################################################################################
// #####################################################################################################

// get a project ---------------------------------------------------------------
export async function getProject(project_id) {
  const res = await axios.get(`${base_url}/api/project/${project_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// get a project for view only ---------------------------------------------------------------
export async function getViewProject(project_id) {
  const res = await axios.get(`${base_url}/api/project/${project_id}/view`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function saveProject2(img, project) {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/user/get-signed-preset",
      { public_id: `canva/user/${project.owner._id}/thumbnails/${project._id}` }
    );
    const { signature, timestamp } = response.data;
    const formData = new FormData();
    formData.append("file", img);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("upload_preset", "canva");
    formData.append("api_key", "762172289273913");
    formData.append(
      "public_id",
      `canva/user/${project.owner._id}/thumbnails/${project._id}`
    );

    const cloudinary_response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      formData
    );
    const res = await axios.put(
      `${base_url}/api/project`,
      {
        ...project,
        thumbnail: cloudinary_response.data.secure_url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
