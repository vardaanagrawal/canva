const express = require("express");
const router = express.Router();

const {
  createProject,
  copyProject,
  getProject,
  getViewProject,
  updateProject,
  saveProject,
  moveProject,
  deleteProject,
} = require("../controllers/ProjectController");
const { authenticateUser } = require("../middleware/auth");

router.post("/", authenticateUser, createProject); // create new project
router.post("/copy", authenticateUser, copyProject); // copy project
router.delete("/:project_id", authenticateUser, deleteProject); // deletes project

router.get("/:project_id", authenticateUser, getProject); //get project
router.get("/:project_id/view", authenticateUser, getViewProject); //get project for view only

router.put("/update", updateProject); // update changes in existing project
router.put("/", saveProject); // update changes in existing project
router.put("/move", authenticateUser, moveProject); // move project to different folder


module.exports = router;
