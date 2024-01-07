const mongoose = require("mongoose");
const { User } = require("./UserModel");
const { Project } = require("./ProjectModel");

const foldersSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Uploads" }],
  starred: { type: Boolean, default: false },
});

// Middleware to update folder details in user and project tables
foldersSchema.pre(
  "save",
  { document: true, query: false },
  async function (next) {
    try {
      // push folder id in user's folder array
      await User.findByIdAndUpdate(this.owner, {
        $push: { folders: this._id },
      });

      // updating folder id in the selected projects
      this.projects.forEach(async (project) => {
        await Project.findByIdAndUpdate(project, { folder: this._id });
      });
      next();
    } catch (error) {
      next(error);
    }
  }
);

foldersSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // removing folder from the user's folder array
      await User.findByIdAndUpdate(this.owner, {
        $pull: { folders: this._id },
      });

      // removing folders in this folder
      this.projects.forEach(async (project) => {
        await Project.findByIdAndUpdate(project, { folder: null });
      });

      next();
    } catch (error) {
      next(error);
    }
  }
);

foldersSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.owner;
    delete ret.__v;
  },
});

mongoose.pluralize(null);
const Folder = mongoose.model("Folders", foldersSchema);
module.exports = { Folder };
