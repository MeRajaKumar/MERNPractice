const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
});

module.exports = mongoose.model("Module", ModuleSchema);
