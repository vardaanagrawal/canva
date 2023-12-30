const express = require("express");
const router = express.Router();

const { getUser } = require("../controllers/UserController");

router.get("/:token", getUser); //fetching user information

module.exports = router;
