const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrent,
  setSubscription,
  setAvatar,
} = require("../../controllers/usersCtrl");

const {
  validateRegistration,
  validateLogin,
  validateSubscription,
} = require("../../middlewares/usersValidation");

const authMiddleware = require("../../middlewares/auth");
const picturesMiddleware = require("../../middlewares/pictures");

router.post("/signup", validateRegistration, register);
router.post("/login", validateLogin, login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrent);
router.patch("/", authMiddleware, validateSubscription, setSubscription);

router.patch(
  "/avatars",
  authMiddleware,
  picturesMiddleware("avatar"),
  setAvatar
);

module.exports = router;
