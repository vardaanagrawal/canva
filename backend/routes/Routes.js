const express = require("express");
const router = express.Router();

//---auth api----------------------------------------------------------------
const { signup, login, verifyEmail } = require("../controllers/AuthController");

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/verifyEmail", verifyEmail);

// ----- user api ----------------------------------------------------------
const { getUser } = require("../controllers/UserController");

router.get("/user/:id", getUser);

//----project routes-----------------------------------------------------------------------
const {
  createProject,
  getProject,
  saveProject
} = require("../controllers/ProjectController");

router.post("/project/create", createProject);
router.get("/project/:id", getProject);
router.put("/project/save", saveProject);

// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

module.exports = router;
