const express = require("express");
const router = express.Router();
const { signup, login, verifyEmail } = require("../controllers/AuthController");

router.post("/signup", signup); // creating new user
router.post("/login", login); // logging in old user
router.post("/verifyEmail", verifyEmail); // verifying email after new user creation

module.exports = router;

// ############################################################################################
// testing google drive #######################################################################
// ############################################################################################
// const { testFunc, testFunc2 } = require("../controllers/UserController");
// router.get("/test", testFunc);
// router.get("/google", testFunc2);
// ############################################################################################
// ############################################################################################
