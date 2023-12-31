const { Canvas } = require("../models/CanvasModel");
const { Project } = require("../models/ProjectModel");
const { User } = require("../models/UserModel");
const { Folder } = require("../models/FoldersModel");
const {
  Components,
  Model1,
  Model2,
  Model3,
} = require("../models/ComponentSchema");
const { Uploads } = require("../models/UploadsModel");
const { ObjectId } = require("mongodb");

// #############################################################################################
// #############################################################################################
const createProject = async (req, res) => {
  const userId = req.user.id; // id of the user who created the project

  // creating a new canvas in the canvas table
  const newCanvas = new Canvas(req.body);
  await newCanvas.save();
  // creating a new project and also storing data of the canvas in it
  const newProject = new Project({
    user: userId,
    canvas: newCanvas._id,
  });

  await newProject.save().then((project) => {
    // Update the user's projects array
    User.findByIdAndUpdate(
      userId,
      { $push: { projects: project._id } },
      { new: true }
    )
      .then((updatedUser) => {
        // console.log(updatedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  res.send({
    success: true,
    message: "New project created",
    // project_details: newProject,
    project: {
      _id: newProject._id,
      name: newProject.name,
      updatedAt: newProject.updatedAt,
      folder: newProject.folder,
      thumbnail: newProject.thumbnail,
    },
  });
};
// #############################################################################################
// #############################################################################################

const copyProject = async (req, res) => {
  const userId = req.user.id;
  const { projectId } = req.body;
  const project = await Project.findById(projectId, ["-_id", "-folder"]);
  const canvas = await Canvas.findById(project.canvas, ["-_id", "-__v"]);

  async function copyAndRetrieveNewIds(idsToCopy) {
    try {
      // Step 1: Retrieve the Documents to Copy
      const existingDocuments = await Components.find(
        {
          _id: { $in: idsToCopy },
        },
        "-_id"
      );

      // Step 2: Create Copies with New `_id` and Save
      const newDocuments = await Promise.all(
        existingDocuments.map(async (oldDoc) => {
          const newDoc = new Components(oldDoc.toObject());
          // Optional: You can modify any fields of the new document here before saving.
          await newDoc.save();
          return newDoc._id;
        })
      );
      return newDocuments;
    } catch (error) {
      console.error(error);
      throw error; // You can choose to handle the error here or propagate it up.
    }
  }

  // creating new components
  const newComponents = await copyAndRetrieveNewIds(project.components);

  // creating new canvas
  const newCanvas = new Canvas(canvas.toObject());
  await newCanvas.save();

  // creating new project
  const newProject = new Project({
    ...project.toObject(),
    name: project.name + " (Copy)",
    components: newComponents,
    canvas: newCanvas._id,
    user: userId,
  });
  // console.log(newProject);
  // console.log("new project: ", newProject);
  await newProject.save().then((project) => {
    // Update the user's projects array
    User.findByIdAndUpdate(
      userId,
      { $push: { projects: project._id } },
      { new: true }
    )
      .then((updatedUser) => {
        // console.log(updatedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  res.send({
    success: true,
    message: "project copied",
    project: {
      _id: newProject._id,
      name: newProject.name,
      updatedAt: newProject.updatedAt,
      folder: newProject.folder,
      thumbnail: newProject.thumbnail,
    },
  });
};

// #############################################################################################
// #############################################################################################
const updateProject = async (req, res) => {
  const project = req.body;

  // filtering older components and new components
  const newComponentsList = project.components.filter((x) => x.isNew === true);
  const oldComponents = project.components.filter((x) => x.isNew !== true);

  function removeField(array, fieldToRemove) {
    return array.map((obj) => {
      const { [fieldToRemove]: removedField, ...rest } = obj;
      return rest;
    });
  }

  let newComponents = await removeField(newComponentsList, "_id");
  newComponents = await removeField(newComponents, "isNew");

  // saving new components
  let newComponentsIds = [];
  newComponents.forEach(async (item) => {
    const newComponent = new Components(item);
    newComponentsIds.push(newComponent._id);
    await newComponent.save();
  });

  // updating old components
  oldComponents.forEach(async (item) => {
    switch (item.component_type) {
      case 2:
        await Model1.findByIdAndUpdate(item._id, item);
        break;
      case 3:
        await Model2.findByIdAndUpdate(item._id, item);
        break;
      case 4:
        await Model3.findByIdAndUpdate(item._id, item);
        break;
      default:
        break;
    }
  });

  // updating canvas
  await Canvas.findByIdAndUpdate(project.canvas._id, project.canvas);

  console.log(project);
  // updating name and notes of project
  const proj = await Project.findByIdAndUpdate(project._id, {
    name: project.name,
    notes: project.notes,
    thumbnail: project.thumbnail,
    $push: { components: { $each: newComponentsIds } },
  })
    .populate("canvas", ["-__v"])
    .populate("components", ["-__v"]);

  res.send({ success: true, project: proj });
};

// #############################################################################################
// #############################################################################################

const deleteProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById({ _id: projectId });
    if (project.user == userId) {
      await project.deleteOne();
      res.send({
        success: true,
        message: "project deleted successfully",
      });
    } else {
      res.send({
        success: false,
        message: "not authorized to delete this project",
      });
    }
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "error occured while deleting project",
    });
  }
};

// #############################################################################################
// #############################################################################################

const moveProject = async (req, res) => {
  const user = req.user;
  const projectId = req.body.projectId;
  const oldFolderId = req.body.from;
  const newFolderId = req.body.to;
  try {
    const project = await Project.findOneAndUpdate(
      { _id: projectId, user: user.id },
      {
        $set: { folder: newFolderId },
      },
      { new: true }
    );
    const newFolder = await Folder.findByIdAndUpdate(
      newFolderId,
      {
        $push: { projects: projectId },
      },
      { new: true }
    );
    console.log(newFolder);
    const oldFolder = await Folder.findByIdAndUpdate(
      oldFolderId,
      {
        $pull: { projects: projectId },
      },
      { new: true }
    );
    console.log(oldFolder);
    res.send({
      success: true,
      oldFolder,
      newFolder,
      project: {
        _id: project._id,
        name: project.name,
        folder: project.folder,
        thumbnail: project.thumbanil,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Some error occured",
    });
  }
};

// #############################################################################################
// #############################################################################################

const getProject = async (req, res) => {
  const projectId = req.params.project_id; // id of the project
  const userId = req.params.user_id; // id of the user who requested the project details
  try {
    // finding the project details based on both project id and user id combined
    // because user can only access its own project and cannot see anyone else's project
    let project = await Project.findById(projectId, { __v: 0 })
      .populate("canvas", ["-__v", "_id"]) // to include the details of the associated canvas
      .populate("components", ["-__v"]); // to include the details of the associated components

    const a = new ObjectId(userId);
    // if project is not found
    if (!project)
      res.send({ success: false, status: 404, message: "Project not found." });
    // checking if the user has its access or not
    else if (!project.user.equals(a)) {
      res.send({ success: false, status: 401, message: "Not Authorized" });
    }
    // if a project is found and user has access
    else {
      res.send({ success: true, status: 200, project: project });
    }
  } catch (err) {
    console.log(err);
    res.send({ success: false, status: 404, message: "Project not found" });
  }
};

// #############################################################################################
// #############################################################################################
const uploadImage = async (req, res) => {
  const { id, img } = req.body;
  const newImg = new Uploads(img);
  await newImg.save();
  await User.findByIdAndUpdate(id, {
    $push: { uploads: newImg._id },
  });
  res.send({
    success: true,
  });
};

// #############################################################################################
// #############################################################################################

const getProjectById = async (req, res) => {
  try {
    const project_id = req.params.project_id;
    const project = await Project.findById(project_id)
      .populate("canvas", "-__v")
      .populate("components")
      .populate("user", ["name", "email"]);
    res.send({ success: true, project: project });
  } catch (err) {
    res.send({ success: false, message: "Project not found" });
  }
};

// #############################################################################################
// #############################################################################################

module.exports = {
  createProject,
  copyProject,
  getProject,
  updateProject,
  uploadImage,
  getProjectById,
  deleteProject,
  moveProject,
};
