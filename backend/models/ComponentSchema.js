const mongoose = require("mongoose");

// Define a base schema
const baseSchema = mongoose.Schema(
  {
    component_type: { type: Number, required: true },
  },
  { discriminatorKey: "component_type" }
);

const Components = mongoose.model("Components", baseSchema);

// Define three sub-schemas based on the value of the 'type' field
const ShapesSchema = mongoose.Schema({
  height: { type: Number, default: 400 },
  width: { type: Number, default: 400 },
  x: { type: Number, default: 0 }, // x coordinate wrt the canvas
  y: { type: Number, default: 0 }, // y coordinate wrt the canvas
  shape_clip_path: { type: String, required: true }, // tells us what shape it is - circle, square, triangle
  shape_bg_color: { type: String, default: "whitesmoke" },
});
const TextSchema = mongoose.Schema({
  font_family: { type: String, required: true },
  font_name: { type: String, required: true },
  font_size: { type: Number, default: 22 },
  color: { type: String, default: "Black" },
  text: { type: String },
  text_bold: { type: Boolean },
  text_italic: { type: Boolean },
  text_underline: { type: Boolean },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
});
const PhotosSchema = mongoose.Schema({
  image_url: { type: String, required: true },
  height: { type: Number, default: 400 },
  width: { type: Number, default: 400 },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
});

// Create models using discriminators
const Model1 = Components.discriminator(2, ShapesSchema);
const Model2 = Components.discriminator(3, TextSchema);
const Model3 = Components.discriminator(4, PhotosSchema);

module.exports = { Components, Model1, Model2, Model3 };
