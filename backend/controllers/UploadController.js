const { Uploads } = require("../models/x4UploadModel");
const { User } = require("../models/x1UserModel");
const { Folders } = require("../models/x3FolderModel");

const uploadImg = async (req, res) => {
  const userId = req.user.id;
  try {
    const newUpload = new Uploads({
      name: req.body.name,
      cloudinary_public_id: req.body.cloudinary_public_id,
      url: req.body.url,
      owner: userId,
    });
    await newUpload.save();
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { uploads: newUpload._id },
      },
      { new: true },
      "-__v"
    ).populate("uploads", "-__v");
    res.send({
      success: true,
      uploads: user.uploads,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Error occured while uploading image",
    });
  }
};

const deleteUpload = async (req, res) => {
  try {
    await Uploads.findByIdAndDelete({ _id: req.body._id });
    await User.findByIdAndUpdate(req.body.owner, {
      $pull: { uploads: req.body._id },
    });
    // await Folders.findByIdAndUpdate(req.body.folder, {
    //   $pull: { uploads: req.body._id },
    // });
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false, message: "Error occured" });
  }
};

const moveUpload = async (req, res) => {
  try {
    const upload = await Uploads.findByIdAndUpdate(
      { _id: req.body.upload._id },
      {
        folder: req.body.to,
      },
      {
        new: true,
      }
    ).populate("folder", ["name", "_id"]);
    if (req.body.from) {
      await Folders.findByIdAndUpdate(req.body.from, {
        $pull: { uploads: req.body.upload._id },
      });
    }
    await Folders.findByIdAndUpdate(req.body.to, {
      $push: { uploads: req.body.upload._id },
    });
    res.send({ success: true, upload });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "Error occured" });
  }
};

const updateUpload = async (req, res) => {
  try {
    const upload = await Uploads.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.send({ success: true, upload });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "Error occured" });
  }
};

module.exports = {
  uploadImg,
  deleteUpload,
  moveUpload,
  updateUpload,
};
