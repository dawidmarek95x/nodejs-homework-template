const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrent,
  setSubscription,
  setAvatar,
  verifyEmail,
  resendVerificationEmail,
} = require("../../controllers/usersCtrl");

const {
  validateRegistration,
  validateLogin,
  validateSubscription,
  validateEmail,
} = require("../../middlewares/usersValidation");

const authenticateUser = require("../../middlewares/authenticateUser");
const verifyAndUploadImage = require("../../middlewares/verifyAndUploadImage");

router.post("/signup", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/logout", authenticateUser, logout);
router.get("/current", authenticateUser, getCurrent);
router.patch("/", authenticateUser, validateSubscription, setSubscription);
router.patch("/avatars", authenticateUser, verifyAndUploadImage("avatar"), setAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateEmail, resendVerificationEmail)

module.exports = router;
