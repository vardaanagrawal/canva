const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: { type: String, default: "Untitled Project" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  canvas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Canvas",
  },
  components: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Components" },
    // { type: mongoose.Schema.Types.ObjectId, ref: "Shapes" },
    // { type: mongoose.Schema.Types.ObjectId, ref: "Text" },
    // { type: mongoose.Schema.Types.ObjectId, ref: "Photos" },
  ],
  notes: { type: String, default: "" },
});

mongoose.pluralize(null);
const Project = mongoose.model("Project", projectSchema);
module.exports = { Project };
