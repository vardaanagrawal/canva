const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectDB = require("./backend/config/db");
connectDB();

const cloudinary = require("./backend/config/cloudinary");

const AuthRoutes = require("./backend/routes/AuthRoutes");
const UserRoutes = require("./backend/routes/UserRoutes");
const ProjectRoutes = require("./backend/routes/ProjectRoutes");
const FolderRoutes = require("./backend/routes/FolderRoutes");
const UploadRoutes = require("./backend/routes/UploadRoutes");
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/project", ProjectRoutes);
app.use("/api/folder", FolderRoutes);
app.use("/api/upload", UploadRoutes);

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(5000, () => {
  console.log("Server running successfully");
});
