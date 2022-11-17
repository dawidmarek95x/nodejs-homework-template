const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const sendEmail = require("../services/sendGrid");
require("dotenv").config();

const SECRET = process.env.SECRET_KEY;
const usersService = require("../services/users");
const isImage = require("../utils/isImage");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersService.findByEmail(email);

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await usersService.createNew(req.body);

    res.status(201).json({
      message:
        "Registration was successful. We have sent a verification email to your inbox. Check your e-mail and verify it before logging in.",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email: enteredEmail, password: enteredPassword } = req.body;

    const user = await usersService.findByEmail(enteredEmail);
    const isPasswordCorrect = await user?.validatePassword(enteredPassword);
    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isEmailVerified = await usersService.checkEmailVerifications(
      enteredEmail
    );
    if (!isEmailVerified) {
      return res.status(401).json({ message: "Email has not been verified" });
    }

    const { _id: userId, name, email, subscription } = user;

    const payload = {
      id: userId,
      name,
      email,
      subscription,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    await usersService.updateToken(userId, token);

    res.status(200).json({
      token,
      user: {
        email,
        subscription,
      },
      message: "User logged in successfully",
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    await usersService.updateToken(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription, token: currentToken } = req.user;
    const { authorization } = req.headers;
    const [bearer, queryToken] = authorization.split(" ");

    if (bearer !== "Bearer" || queryToken !== currentToken) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    res.status(200).json({
      email,
      subscription,
    });
  } catch (err) {
    next(err);
  }
};

const setSubscription = async (req, res, next) => {
  try {
    const { id, email } = req.user;
    const { subscription } = req.body;
    await usersService.updateSubscription(id, subscription);

    res.status(200).json({
      message: "Subscription has been updated",
      user: {
        email,
        subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const setAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "This is not a photo" });
  }

  const { id } = req.user;
  const { path: temporaryName } = req.file;
  const extension = path.extname(temporaryName);
  const avatarURL = `/avatars/user_${id}${extension}`;
  const fileName = path.resolve(`./public${avatarURL}`);

  const isValidImage = await isImage(temporaryName);
  if (isValidImage) {
    try {
      await fs.rename(temporaryName, fileName);
      await usersService.updateAvatar(id, avatarURL);
      return res.status(200).json({ avatarURL });
    } catch (err) {
      await fs.unlink(temporaryName);
      return next(err);
    }
  }

  await fs.unlink(temporaryName);
  return res.status(400).json({ message: "This is not a photo" });
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await usersService.updateVerificationToken(verificationToken);
    if (user) {
      return res.status(200).json({ message: "Verification succesful" });
    }

    res.status(404).json({ message: "User not found" });
  } catch (err) {
    next(err);
  }
};

const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await usersService.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isEmailVerified = await usersService.checkEmailVerifications(email);
    if (isEmailVerified) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const {name, verificationToken} = user;
    await sendEmail(email, verificationToken, name);
    res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  setSubscription,
  setAvatar,
  verifyEmail,
  resendVerificationEmail,
};
