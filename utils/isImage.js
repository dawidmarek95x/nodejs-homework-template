const Jimp = require("jimp");

const isImage = async (path) => {
  try {
    const avatar = await Jimp.read(path);
    if (avatar) {
      avatar.resize(250, 250).rotate(0).write(path);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = isImage;
