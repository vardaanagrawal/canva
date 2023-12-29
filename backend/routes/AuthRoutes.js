const express = require("express");
const router = express.Router();
const { signup, login, verifyEmail } = require("../controllers/AuthController");

router.post("/signup", signup); // creating new user
router.post("/login", login); // logging in old user
router.post("/verifyEmail", verifyEmail); // verifying email after new user creation

module.exports = router;
