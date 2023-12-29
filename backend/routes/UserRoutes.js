const express = require("express");
const router = express.Router();

const { getUser } = require("../controllers/UserController");

router.get("/:id", getUser); //fetching user information

module.exports = router;
