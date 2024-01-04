const mongoose = require("mongoose");

const foldersSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  starred: { type: Boolean, default: false },
});

mongoose.pluralize(null);
const Folder = mongoose.model("Folders", foldersSchema);
module.exports = { Folder };
