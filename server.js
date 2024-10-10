const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotnev = require("dotenv");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotnev.config();

const connectDB = require("./backend/config/db");
connectDB();


const AuthRoutes = require("./backend/routes/AuthRoutes");
const UserRoutes = require("./backend/routes/x1UserRoutes");
const ProjectRoutes = require("./backend/routes/x2ProjectRoutes");
const FolderRoutes = require("./backend/routes/x3FolderRoutes");
const UploadRoutes = require("./backend/routes/x4UploadRoutes");

app.use("/test", (req, res) => {
  res.send(process.env.MAILER_EMAIL);
});
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

app.listen(4000, () => {
  console.log("server running successfully");
});
