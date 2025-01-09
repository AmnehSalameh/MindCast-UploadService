require("dotenv").config();
const express = require("express");
const connectDB = require("./app/utils/db");
const videoRoutes = require("./app/routes/videoRoutes");
//const cors = require("cors");

const app = express();
const port = process.env.PORT;

// Connect to DocumentDB
connectDB();

// Middleware
app.use(express.json());
//app.use(cors());

// Routes
app.use("/api/videos", videoRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
