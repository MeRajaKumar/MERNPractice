const Department = require("../models/department");

// GET all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ msg: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE department
exports.addDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!department) return res.status(404).json({ msg: "Department not found" });
    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ msg: "Department not found" });
    res.json({ msg: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
