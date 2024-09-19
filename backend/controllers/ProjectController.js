const { Projects } = require("../models/x2ProjectsModel");
const { Pages } = require("../models/x5PagesModel");
const { Components } = require("../models/x6ComponentsModel");
const { ObjectId } = require("mongodb");
const { Folders } = require("../models/x3FolderModel");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const createProject = async (req, res) => {
  try {
    const user_id = req.user.id;
    // creating project
    const newProject = new Projects({
      name: "Untitled Project",
      owner: user_id,
      project_type: req.body.project_type,
      thumbnail: req.body.thumbnail,
    });

    // creating page

    const newPage = new Pages({
      page_number: 1,
      project: newProject._id,
      height: req.body.height,
      width: req.body.width,
      color: req.body.bg_color,
    });

    newProject.pages.push(newPage._id);

    await newProject.save();
    await newPage.save();

    // sending response
    res.send({
      success: true,
      message: "New project created",
      project: {
        _id: newProject._id,
        name: newProject.name,
        project_type: newProject.project_type,
        thumbnail: newProject.thumbnail,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const copyProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.body.projectId;

  try {
    // Step 1: Fetch the original project and populate its pages and components
    const originalProject = await Projects.findById(projectId)
      .populate({
        path: "pages",
        model: "Pages",
        populate: {
          path: "components",
          model: "Components",
        },
      })
      .exec();

    if (!originalProject) {
      console.error("Original project not found");
      return;
    }

    // Step 2: Create a new project with a new name
    const newProject = new Projects({
      name: "Copy of " + originalProject.name,
      owner: userId,
      pages: [], // Will be populated in the next steps
      project_type: originalProject.project_type,
      thumbnail: originalProject.thumbnail,
    });

    // Step 3: Duplicate each page along with its components
    for (const originalPage of originalProject.pages) {
      let { _id, components, ...rest } = originalPage.toObject();
      const newPage = new Pages({
        projectId: newProject._id,
        ...rest,
      });

      for (const originalComponent of originalPage.components) {
        let { _id, ...rest } = originalComponent.toObject();
        const newComponent = new Components(rest);
        await newComponent.save();
        newPage.components.push(newComponent._id);
      }

      await newPage.save();
      newProject.pages.push(newPage._id);
    }

    // Step 4: Save the new project
    await newProject.save();
    res.send({
      success: true,
      project: {
        _id: newProject._id,
        name: newProject.name,
        project_type: newProject.project_type,
      },
    });
  } catch (error) {
    console.error("Error duplicating project:", error);
    res.send({ success: false, message: "some error occured" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const getProject = async (req, res) => {
  const projectId = req.params.project_id; // id of the project
  const userId = req.user.id; // id of the user who requested the project details
  try {
    // finding the project details based on both project id and user id combined
    // because user can only access its own project and cannot see anyone else's project
    let project = await Projects.findById(projectId, { __v: 0 })
      .populate("owner", ["name", "email", "_id"]) // to include the details of the associated user
      .populate("folder", ["name", "_id"]) // to include the details of the associated folder
      .populate({
        path: "pages",
        model: "Pages",
        populate: {
          path: "components",
          model: "Components",
          // or use select: '-field1 -field2' to exclude multiple fields
        },
      }); // to include the details of the associated pages
    const a = new ObjectId(userId);
    // if project is not found
    if (!project)
      res.send({ success: false, status: 404, message: "not found" });
    else {
      res.send({
        success: true,
        project: project,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const getViewProject = async (req, res) => {
  const projectId = req.params.project_id; // id of the project
  try {
    // finding the project details based on both project id and user id combined
    // because user can only access its own project and cannot see anyone else's project
    let project = await Projects.findById(projectId, { __v: 0 })
      .populate("owner", ["name", "email", "_id"]) // to include the details of the associated user
      .populate("folder", ["name", "_id"]) // to include the details of the associated folder
      .populate({
        path: "pages",
        model: "Pages",
        populate: {
          path: "components",
          model: "Components",
          // or use select: '-field1 -field2' to exclude multiple fields
        },
      }); // to include the details of the associated pages
    // if project is not found
    if (!project)
      res.send({ success: false, status: 404, message: "not found" });
    else {
      res.send({
        success: true,
        project: project,
      });
    }
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "server error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const saveProject = async (req, res) => {
  try {
    const project = req.body;
    const pages = req.body.pages;
    const pagesPromises = pages.map(async (page) => {
      const componentsPromises = page.components.map(async (component) => {
        const updatedComponent = await Components.findByIdAndUpdate(
          component._id,
          component
        );
        if (updatedComponent) {
          return component._id;
        } else {
          const { _id, ...restComponent } = component;
          const newComponent = new Components(restComponent);
          await newComponent.save();
          return newComponent._id;
        }
      });
      const a = Promise.all(componentsPromises).then(async (components) => {
        page.components = components;
        const updatedPage = await Pages.findByIdAndUpdate(page._id, page);
        if (updatedPage) {
          return page._id;
        } else {
          const { _id, ...restPage } = page;
          const newPage = new Pages(restPage);
          await newPage.save();
          return newPage._id;
        }
      });
      return a;
    });
    const updated_project = Promise.all(pagesPromises).then((pages_array) => {
      project.pages = pages_array;
      return Projects.findByIdAndUpdate(project._id, project);
    });
    res.send({ success: true, project: updated_project });
  } catch (err) {
    console.log("error occured", err);
    res.send({ success: false });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const moveProject = async (req, res) => {
  const user_id = new ObjectId(req.user.id);
  const projectId = new ObjectId(req.body.projectId);
  let oldFolderId;
  if (req.body.from) oldFolderId = new ObjectId(req.body.from);
  const newFolderId = new ObjectId(req.body.to);
  try {
    const project = await Projects.findOneAndUpdate(
      { _id: projectId, owner: user_id },
      {
        $set: { folder: newFolderId },
      },
      { new: true }
    );
    const newFolder = await Folders.findByIdAndUpdate(
      newFolderId,
      {
        $push: { projects: projectId },
      },
      { new: true }
    );
    var oldFolder;
    if (oldFolderId) {
      oldFolder = await Folders.findByIdAndUpdate(
        oldFolderId,
        {
          $pull: { projects: projectId },
        },
        { new: true }
      );
    }
    res.send({
      success: true,
      oldFolder,
      newFolder,
      project,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Some error occured",
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.project_id;
  try {
    const project = await Projects.findById({ _id: projectId });
    if (project.owner == userId) {
      await project.deleteOne();
      project.pages.forEach(async (page) => {
        const p = await Pages.findById(page);
        await p.deleteOne();
      });
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateProject = async (req, res) => {
  const project_id = req.body.project_id;
  const project = await Projects.findByIdAndUpdate(project_id, req.body, {
    new: true,
  });
  res.send({ success: true, project: project });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  createProject,
  copyProject,
  getProject,
  getViewProject,
  updateProject,
  moveProject,
  deleteProject,
  saveProject,
};
