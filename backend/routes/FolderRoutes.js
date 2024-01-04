const express = require("express");
const router = express.Router();

const {
  createFolder,
  updateFolder,
  deleteFolder,
} = require("../controllers/FolderController");

router.post("/create", createFolder); //create new folder
router.put("/update", updateFolder); //create new folder
router.delete("/:folder_id", deleteFolder); //create new folder

module.exports = router;
