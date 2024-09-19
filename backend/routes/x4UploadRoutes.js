const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth");
const {
  uploadImg,
  deleteUpload,
  moveUpload,
  updateUpload
} = require("../controllers/UploadController");

router.post("/", authenticateUser, uploadImg);
router.post("/delete", authenticateUser, deleteUpload);
router.put("/move", authenticateUser, moveUpload);
router.put("/", authenticateUser, updateUpload);

module.exports = router;
