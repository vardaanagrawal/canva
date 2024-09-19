const mongoose = require("mongoose");

const uploadsSchema = mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folders" },
  url: { type: String },
  cloudinary_public_id: { type: String },
});

const Uploads = mongoose.model("Uploads", uploadsSchema);
module.exports = { Uploads };
