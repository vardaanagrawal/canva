const express = require("express");
const router = express.Router();

const {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolder,
} = require("../controllers/FolderController");
const { authenticateUser } = require("../middleware/auth");

router.post("/", authenticateUser, createFolder); // create new folder
router.get("/:folderId", authenticateUser, getFolder); // get folder
router.put("/:folderId", authenticateUser, updateFolder); // update folder
router.delete("/:folderId", authenticateUser, deleteFolder); // delete folder

module.exports = router;
