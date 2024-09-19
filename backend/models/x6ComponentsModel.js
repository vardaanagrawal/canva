const mongoose = require("mongoose");

// Define a base schema
const baseSchema = mongoose.Schema(
  {
    // _id: { type: String, required: true, unique: true, index: true },
    component_type: String, // like -> page, shape, text, image
    page_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pages" },
    height: Number,
    width: Number,
    x: Number, // x coordinate wrt the canvas
    y: Number, // y coordinate wrt the canvas
    zIndex: Number,
    opacity: Number,
  },
  { discriminatorKey: "component_type" }
);

const Components = mongoose.model("Components", baseSchema);

// Define three sub-schemas based on the value of the 'type' field
const ShapesSchema = mongoose.Schema({
  svg: String,
  color: String,
  border_width: Number,
  border_color: String,
});
const TextSchema = mongoose.Schema({
  text: String,
  font_family: String,
  font_name: String,
  font_size: Number,
  color: String,
  bold: String,
  italic: String,
  underline: String,
  text_align: String,
  text_outline: String,
  text_shadow: String,
});
const PhotosSchema = mongoose.Schema({
  image_url: String,
});

// Create models using discriminators
const Model1 = Components.discriminator("shape", ShapesSchema);
const Model2 = Components.discriminator("text", TextSchema);
const Model3 = Components.discriminator("image", PhotosSchema);

module.exports = { Components, Model1, Model2, Model3 };
