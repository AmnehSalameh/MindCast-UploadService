const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const videoController = require("../controllers/video.controller");

// Configure Multer
const uploadDirectory = path.join(__dirname, "../uploads");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdir(uploadDirectory, { recursive: true }, (err) => {
        if (err) return cb(err);
        cb(null, uploadDirectory);
      });
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only MP4 files are allowed."), false);
    }
  },
});

router.post("/upload", upload.single("mp4File"), videoController.uploadVideo);

module.exports = router;
