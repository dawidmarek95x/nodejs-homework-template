const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();

const SECRET = process.env.SECRET_KEY;
const User = require("../models/user");

const findByEmail = async (email) => await User.findOne({ email });

const createNew = async (body) => {
  const { name, email, password } = body;
  const avatarURL = gravatar.url(email, {s: "250", d: "mp"});
  const newUser = new User({ name, email, avatarURL });
  await newUser.setPassword(password);
  await newUser.save();

  return newUser;
};

const updateToken = async (id, token = null) =>
  await User.findByIdAndUpdate(id, { token });

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET);
    const { id } = payload;
    const user = await User.findById(id);

    return user.token === token ? user : null;
  } catch (err) {
    return null;
  }
};

const updateSubscription = async (id, subscription) => {
  await User.findByIdAndUpdate(id, { subscription });
};

const updateAvatar = async (id, avatarURL) => {
  await User.findByIdAndUpdate(id, { avatarURL });
};

module.exports = {
  findByEmail,
  createNew,
  updateToken,
  authenticateUser,
  updateSubscription,
  updateAvatar,
};
