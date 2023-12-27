const mongoose = require("mongoose");

const canvasSchema = mongoose.Schema({
  height: { type: Number, default: 400 },
  width: { type: Number, default: 400 },
  bg_color: { type: String, default: "White" },
});

mongoose.pluralize(null);
const Canvas = mongoose.model("Canvas", canvasSchema);
module.exports = { Canvas };
