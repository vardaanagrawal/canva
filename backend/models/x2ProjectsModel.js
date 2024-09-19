const mongoose = require("mongoose");
const { User } = require("./x1UserModel");
const { Folders } = require("./x3FolderModel");

const projectsSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folders" },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pages" }],
  project_type: String,
  thumbnail: { type: String },
});

projectsSchema.pre("save", async function (next) {
  try {
    // adding this project in the user
    await User.findByIdAndUpdate(this.owner, {
      $push: { projects: this._id },
    });
    next();
  } catch (err) {
    next(err);
  }
});

projectsSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // deleting it from the folder
      await Folders.findByIdAndUpdate(this.folder, {
        $pull: { projects: this._id },
      });
      // deleting it from the user
      await User.findByIdAndUpdate(this.owner, {
        $pull: { projects: this._id },
      });

      next();
    } catch (err) {
      next(err);
    }
  }
);

const Projects = mongoose.model("Projects", projectsSchema);
module.exports = { Projects };
