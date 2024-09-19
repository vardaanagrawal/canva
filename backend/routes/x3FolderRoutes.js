const express = require("express");
const router = express.Router();

const {
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder,
} = require("../controllers/FolderController");
const { authenticateUser } = require("../middleware/auth");

router.post("/", authenticateUser, createFolder); // create new folder
router.get("/:folder_id", authenticateUser, getFolder); // get folder
router.put("/:folder_id", authenticateUser, updateFolder); // update folder
router.delete("/:folder_id", authenticateUser, deleteFolder); // delete folder

module.exports = router;
