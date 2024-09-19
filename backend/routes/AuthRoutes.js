const express = require("express");
const router = express.Router();
const {
  checkEmail,
  sendVerificationCode,
  verifyCode,
} = require("../controllers/auth/email");

const { googleAuth } = require("../controllers/auth/google");

router.post("/google", googleAuth);

router.get("/check-email/:email", checkEmail);
router.post("/send-verification-mail/:email", sendVerificationCode);
router.post("/verify-code", verifyCode);

module.exports = router;
