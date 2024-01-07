const express = require("express");
const router = express.Router();

const {
  createProject,
  getProject,
  updateProject,
  uploadImage,
  getProjectById,
  deleteProject,
  moveProject
} = require("../controllers/ProjectController");
const { authenticateUser } = require("../middleware/auth");

router.post("/", authenticateUser, createProject); // create new project
router.put("/",  updateProject); // update changes in existing project
router.delete("/:projectId", authenticateUser, deleteProject); // deletes project
router.put("/move", authenticateUser, moveProject); // move project to different folder

router.get("/:project_id/:user_id", getProject); //get project details
router.get("/:project_id", getProjectById); //get project details

router.post("/upload/image", uploadImage); //upload image

module.exports = router;
