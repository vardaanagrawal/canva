const mongoose = require("mongoose");
const Uploads = require("./UploadsModel");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean, default: false },
    password: { type: String },
    is_google: { type: Boolean },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Uploads" }],
    folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folders" }],
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
const User = mongoose.model("User", userSchema);
module.exports = { User };
