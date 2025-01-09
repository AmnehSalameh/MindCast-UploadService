const Video = require("../models/video.models");
const { uploadToS3 } = require("../services/s3Service");
require("dotenv").config();

const videoController = {
  uploadVideo: async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { name, category, director } = req.body;
    if (!name || !category || !director) {
      return res.status(400).send("Name, category, and director are required.");
    }
    try {
      const s3Data = await uploadToS3(req.file, process.env.S3_BUCKET_NAME);
      console.log(s3Data);
      if (s3Data) {
        const video = new Video({
          name,
          category,
          director,
          s3Url: s3Data.url,
          s3Key: s3Data.eTag,
        });
        // Save the video to the database
        await video.save();
        // Send a success response
        res.status(201).json({ message: "Video uploaded successfully", video });
      } else {
        console.error("Error uploading video to s3:", error);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ message: "Error uploading video", error });
    }
  },
};

module.exports = videoController;
