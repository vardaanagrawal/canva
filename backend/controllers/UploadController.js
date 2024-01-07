const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = async (req, res) => {
//   console.log(req.user);
  console.log(req.body);
  //   const result = await cloudinary.uploader.upload(image);
};

module.exports = { uploadImageToCloudinary };
