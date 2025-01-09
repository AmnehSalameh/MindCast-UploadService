const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    s3Url: {
      type: String,
      required: true,
    },
    s3Key: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.set("debug", true); // Log all MongoDB queries

module.exports = mongoose.model("videos", videoSchema);
