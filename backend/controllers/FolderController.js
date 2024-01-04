const { Folder } = require("../models/FoldersModel");
const { Project } = require("../models/ProjectModel");
const { User } = require("../models/UserModel");

const createFolder = async (req, res) => {
  const userId = req.body.user_id;
  const { name, projects } = req.body;

  const newFolder = new Folder({
    name,
    owner: userId,
  });
  await newFolder.save();

  for (let i = 0; i < projects.length; i++) {
    await Project.findByIdAndUpdate(
      { _id: projects[i] },
      { folder: newFolder._id }
    );
  }

  await User.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { folders: newFolder._id },
    }
  );
  const user = await User.findById(userId, {
    password: 0,
    email_verified: 0,
    is_google: 0,
    __v: 0,
  })
    .populate("projects", ["name", "updatedAt", "folder"])
    .populate("uploads")
    .populate("folders", ["-owner", "-__v"]);

  res.send({ success: true, user: user });
};

const updateFolder = async (req, res) => {
  const folderId = req.body.id;
  const starred = req.body.starred;
  await Folder.findByIdAndUpdate({ _id: folderId }, { starred });
  res.send({ success: true });
};

const deleteFolder = async (req, res) => {
  const folder_id = req.params.folder_id;
  // removing all the projects in the folder to be deleted
  const projects = await Project.find({ folder: folder_id });
  for (let i = 0; i < projects.length; i++) {
    await Project.findByIdAndUpdate({ _id: projects[i]._id }, { folder: null });
  }
  // deleting the folder
  const folder = await Folder.findByIdAndDelete({ _id: folder_id });
  // removing this folder's id in the user table folders array
  const user = await User.findByIdAndUpdate(
    { _id: folder.owner },
    { $pull: { folders: folder._id } }
  ).populate("folders",["-owner","-__v"]);

  res.send({ success: true, folders: user.folders });
};

module.exports = { createFolder, updateFolder, deleteFolder };
