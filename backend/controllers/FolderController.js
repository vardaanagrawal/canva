const { Folders } = require("../models/x3FolderModel");
const { Projects } = require("../models/x2ProjectsModel");
const { ObjectId } = require("mongodb");

const createFolder = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;
  const newFolder = new Folders({
    name,
    owner: userId,
  });
  await newFolder.save();

  res.send({ success: true, folder: newFolder });
};

// function to get folder
const getFolder = async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const folderId = new ObjectId(req.params.folderId);
    const folder = await Folders.findOne(
      { _id: folderId, owner: userId },
      "-__v"
    ).populate("owner", "name");
    if (!folder) {
      res.send({ success: false, message: "Folder not found" });
    } else {
      const projectsInFolder = await Projects.find({ folder: folderId }, [
        "_id",
        "name",
      ]);
      res.send({ success: true, folder: folder, projects: projectsInFolder });
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
    const folderId = new ObjectId(req.params.folder_id);
    const updatedFields = req.body;
    const updatedFolder = await Folders.findOneAndUpdate(
      { _id: folderId, owner: userId },
      updatedFields,
      { new: true }
    );
    res.send({
      success: true,
      folder: updatedFolder,
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

// function to delete folder
const deleteFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.folder_id;
    const folder = await Folders.findOne({ _id: folderId, owner: userId });
    await folder.deleteOne();
    // removing folders in this folder
    folder.projects.forEach(async (project) => {
      await Projects.findByIdAndUpdate(project, { folder: null });
    });

    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

module.exports = {
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder,
};
