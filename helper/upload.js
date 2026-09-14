const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB maximum per file
    files: 10,
  },

fileFilter: (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const videoTypes = [
    "video/mp4",
    "video/quicktime",
    "video/webm",
  ];

  if (imageTypes.includes(file.mimetype)) {
    if (file.size > 5 * 1024 * 1024) {
      return cb(new Error("Image must be less than 5 MB"));
    }
  }

  if (videoTypes.includes(file.mimetype)) {
    if (file.size > 100 * 1024 * 1024) {
      return cb(new Error("Video must be less than 100 MB"));
    }
  }

  if (
    !imageTypes.includes(file.mimetype) &&
    !videoTypes.includes(file.mimetype)
  ) {
    return cb(new Error("Only image and video files are allowed"));
  }

  cb(null, true);
}
});

module.exports = upload;