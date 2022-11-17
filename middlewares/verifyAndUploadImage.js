const multer = require("multer");
const setFileSize = require("../utils/setFileSize");

const verifyAndUploadImage = (
  postKey = "image",
  uploadDir = "tmp/",
  fileSizeLimit = setFileSize(5, "MB")
) => {
  const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => cb(null, file.originalname),
    limits: { fileSize: fileSizeLimit },
  });

  const mimetypeAllowedList = [
    "image/bmp",
    "image/gif",
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/tiff",
  ];

  const multerInstance = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const mimetype = file.mimetype;
      const hasCompatibleMimetype = mimetypeAllowedList.includes(mimetype);
      return cb(null, hasCompatibleMimetype);
    },
  });

  return multerInstance.single(postKey);
};

module.exports = verifyAndUploadImage;
