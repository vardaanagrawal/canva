const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const { authenticateUser } = require("../middleware/auth");
const {
  getUser,
  updateProfile,
} = require("../controllers/UserController");

router.get("/", authenticateUser, getUser); //fetching user information
router.put("/", authenticateUser, updateProfile); //updating profile-picture

router.post("/get-signed-preset", (req, res) => {
  const public_id = req.body.public_id;

  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = "y93X6wAgsKLZEDO1yPWNVwtoB98";

  const signature = cloudinary.utils.api_sign_request(
    { public_id, timestamp, upload_preset: "canva" },
    apiSecret
  );

  res.json({ signature, timestamp });
});

module.exports = router;
