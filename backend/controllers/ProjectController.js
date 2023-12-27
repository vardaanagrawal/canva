const { Canvas } = require("../models/CanvasModel");
const { Project } = require("../models/ProjectModel");
const { User } = require("../models/UserModel");
const {
  Components,
  Model1,
  Model2,
  Model3,
} = require("../models/ComponentSchema");

// #############################################################################################
// #############################################################################################
const createProject = async (req, res) => {
  const userId = req.body.id;
  const height = req.body.height;
  const width = req.body.width;
  const bg_color = req.body.bg_color;

  const newCanvas = new Canvas({ height, width, bg_color });
  await newCanvas.save();
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
        console.log(updatedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  res.send({
    success: true,
    message: "New project created",
    project_details: newProject,
  });
};

// #############################################################################################
// #############################################################################################
const getProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    let project = await Project.findById(projectId, { __v: 0 })
      .populate("canvas", ["-__v", "_id"])
      .populate("components", ["-__v"]);
    res.send({ success: true, project: project });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

// #############################################################################################
// #############################################################################################
const saveProject = async (req, res) => {
  const project = req.body;

  // filtering older components and new components
  const newComponentsList = project.components.filter((x) => x.isNew === true);
  const oldComponents = project.components.filter((x) => x.isNew !== true);
  console.log(oldComponents);

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

  // updating name and notes of project
  const proj = await Project.findByIdAndUpdate(project._id, {
    name: project.name,
    notes: project.notes,
    $push: { components: { $each: newComponentsIds } },
  })
    .populate("canvas", ["-__v"])
    .populate("components", ["-__v"]);

  // res.send({ success: true, project: proj });
  res.send({ success: true, project: proj });
};

module.exports = { createProject, getProject, saveProject };
