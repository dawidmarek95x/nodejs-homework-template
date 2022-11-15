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

const authMiddleware = require("../../middlewares/auth");
const picturesMiddleware = require("../../middlewares/pictures");

router.post("/signup", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrent);
router.patch("/", authMiddleware, validateSubscription, setSubscription);
router.patch("/avatars", authMiddleware, picturesMiddleware("avatar"), setAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateEmail, resendVerificationEmail)

module.exports = router;
