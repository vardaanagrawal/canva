const express = require("express");
const router = express.Router();

const {
  createProject,
  getProject,
  saveProject,
  uploadImage,
} = require("../controllers/ProjectController");

router.post("/create", createProject); //create new project
router.get("/:project_id/:user_id", getProject); //get project details
router.put("/save", saveProject); //save changes in existing project

router.post("/upload/image", uploadImage); //upload image

module.exports = router;
