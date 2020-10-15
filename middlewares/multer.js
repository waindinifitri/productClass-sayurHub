const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloud config
cloudinary.config({
  cloud_name: "waindinifitri",
  api_key: "886776916645276",
  api_secret: "pzfx-iwO2nTufGJCVRjSVyqa5p4",
});

// storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "sayurHub",
  allowedFormats: ["jpg", "jpeg", "png", "svg"],
  filename: (req, files, cb) => {
    cb(null, Date.now() + "_" + files.originalname.split(".")[0]);
  },
});

const uploader = multer({
  storage: storage,
});

module.exports = uploader;