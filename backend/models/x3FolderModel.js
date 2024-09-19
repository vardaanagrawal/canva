const mongoose = require("mongoose");
const { Projects } = require("./x2ProjectsModel");
const { User } = require("./x1UserModel");

const foldersSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projects" }],
  uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Uploads" }],
});

// Middleware to update folder details in user and project tables
foldersSchema.pre(
  "save",
  { document: true, query: false },
  async function (next) {
    try {
      // push folder id in user's folder array
      console.log(this);
      await User.findByIdAndUpdate(this.owner, {
        $push: { folders: this._id },
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

      next();
    } catch (error) {
      next(error);
    }
  }
);

const Folders = mongoose.model("Folders", foldersSchema);
module.exports = { Folders };
