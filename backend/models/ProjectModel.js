const mongoose = require("mongoose");
const { Canvas } = require("./CanvasModel");
const { Components } = require("./ComponentSchema");
const { User } = require("./UserModel");

const projectSchema = mongoose.Schema(
  {
    name: { type: String, default: "Untitled Project" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    canvas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canvas",
    },
    components: [{ type: mongoose.Schema.Types.ObjectId, ref: "Components" }],
    notes: { type: String, default: "" },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folders" },
    thumbnail: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Middleware to delete associated canvas and components before removing a project
projectSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // Delete associated canvas
      if (this.canvas) {
        await Canvas.findByIdAndDelete(this.canvas);
      }

      // Delete associated components
      if (this.components.length > 0) {
        await Components.deleteMany({ _id: { $in: this.components } });
      }

      // removing the canvas from users array
      if (this.user) {
        await User.findByIdAndUpdate(
          { _id: this.user },
          { $pull: { projects: this._id } }
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);

mongoose.pluralize(null);
const Project = mongoose.model("Project", projectSchema);
module.exports = { Project };
