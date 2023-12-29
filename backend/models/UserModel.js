const mongoose = require("mongoose");
const Uploads = require("./UploadsModel");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  email_verified: { type: Boolean, default: false },
  password: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Uploads" }],
});

mongoose.pluralize(null);
const User = mongoose.model("User", userSchema);
module.exports = { User };