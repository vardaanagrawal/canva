const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/auth");
const { getUser } = require("../controllers/UserController");

router.get("/", authenticateUser, getUser); //fetching user information

module.exports = router;
