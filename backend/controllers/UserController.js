const { User } = require("../models/x1UserModel");

const getUser = async (req, res) => {
  const user_id = req.user.id;
  try {
    const user = await User.findById(user_id, {
      password: 0,
      email_verified: 0,
      is_google: 0,
      __v: 0,
    })
      .populate({
        path: "projects",
        model: "Projects",
        populate: {
          path: "folder",
          model: "Folders",
          select: ["_id", "name"],
        },
        select: ["-pages", "-owner", "-__v"],
      })
      .populate({
        path: "uploads",
        model: "Uploads",
        populate: {
          path: "folder",
          model: "Folders",
          select: "name _id",
        },
        select: ["-__v", "-owner", "-cloudinary_public_id"],
      })
      .populate({
        path: "folders",
        model: "Folders",
        select: ["-__v", "-owner"],
      });
    if (user) res.send({ success: true, user: user });
    else res.send({ success: false, message: "User not found" });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "error occured" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true },
      "-__v"
    );
    res.send({
      ...req.body,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Error occured while uploading image",
    });
  }
};

module.exports = { getUser, updateProfile };
