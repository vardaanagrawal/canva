const mongoose = require("mongoose");

const uploadsSchema = mongoose.Schema({
  asset_id: { type: String, required: true },
  image_url: { type: String, required: true },
  height: { type: Number, default: 200 },
  width: { type: Number, default: 200 },
});

mongoose.pluralize(null);
const Uploads = mongoose.model("Uploads", uploadsSchema);
module.exports = { Uploads };
