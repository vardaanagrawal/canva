const { Folder } = require("../models/FoldersModel");
const { Project } = require("../models/ProjectModel");
const { User } = require("../models/UserModel");
const { ObjectId } = require("mongodb");

// function to create new folder
const createFolder = async (req, res) => {
  const userId = req.user.id;
  const { name, projects } = req.body;
  const newFolder = new Folder({
    name,
    owner: userId,
    projects,
  });
  await newFolder.save();
  res.send({ success: true, folder: newFolder });
};

// function to get folder
const getFolder = async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const folderId = new ObjectId(req.params.folderId);
    const folder = await Folder.findOne(
      { _id: folderId, owner: userId },
      "-__v"
    ).populate("owner", "name");
    if (!folder) {
      res.send({ success: false, message: "Folder not found" });
    } else {
      const projectsInFolder = await Project.find({ folder: folderId }, [
        "_id",
        "name",
      ]);
      res.send({ success: true, folder: folder, projects: projectsInFolder });
      console.log(projectsInFolder);
    }
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

// function to update folder
const updateFolder = async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const folderId = new ObjectId(req.params.folderId);
    const updatedFields = req.body;
    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: folderId, owner: userId },
      updatedFields,
      { new: true }
    );
    res.send({
      success: true,
      folder: updatedFolder,
    });
  } catch (err) {
    res.send({ success: false });
  }
};

// function to delete folder
const deleteFolder = async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const folderId = new ObjectId(req.params.folderId);
    const folder = await Folder.findOne({ _id: folderId, owner: userId });
    await folder.deleteOne();
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
  }
};

module.exports = { createFolder, getFolder, updateFolder, deleteFolder };
