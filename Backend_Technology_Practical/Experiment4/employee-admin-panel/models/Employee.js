const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "employee" },
  department: { type: String },
  salary: { type: Number }
});

module.exports = mongoose.model("Employee", employeeSchema);
