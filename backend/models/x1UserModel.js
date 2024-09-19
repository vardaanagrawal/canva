const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  profile_pic: { type: String },
  email: { type: String, required: true, unique: true },
  // email_verified: { type: Boolean, default: false },
  // password: { type: String },
  // is_google: { type: Boolean },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projects" }],
  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folders" }],
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Uploads" }],
});

mongoose.pluralize(null);
const User = mongoose.model("User", userSchema);
module.exports = { User };
