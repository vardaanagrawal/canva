const mongoose = require("mongoose");
const { Projects } = require("./x2ProjectsModel");
const { Components } = require("./x6ComponentsModel");

const pagesSchema = mongoose.Schema({
  // _id: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: "" },
  page_number: { type: Number },
  notes: { type: String, default: "" },
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: "Components" }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
  height: { type: Number },
  width: { type: Number },
  color: { type: String, default: "white" },
});

// pagesSchema.pre(
//   "save",
//   { document: true, query: false },
//   async function (next) {
//     try {
//       console.log(this);
//       await Projects.findByIdAndUpdate(this.project, {
//         $push: { pages: this._id },
//       });
//       next();
//     } catch (err) {
//       next(err);
//     }
//   }
// );

pagesSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      this.components.forEach(async (item) => {
        await Components.findByIdAndDelete(item);
      });
      next();
    } catch (err) {
      next(err);
    }
  }
);

const Pages = mongoose.model("Pages", pagesSchema);
module.exports = { Pages };
