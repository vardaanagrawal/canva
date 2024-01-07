const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth");
const { uploadImageToCloudinary } = require("../controllers/UploadController");

router.post("/", uploadImageToCloudinary);

module.exports = router;
