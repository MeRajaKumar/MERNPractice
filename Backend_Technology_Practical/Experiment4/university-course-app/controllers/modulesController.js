const Module = require("../models/modules");

// GET all modules
exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find().populate("course");
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET module by ID
exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id).populate("course");
    if (!module) return res.status(404).json({ msg: "Module not found" });
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE module
exports.addModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE module
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) return res.status(404).json({ msg: "Module not found" });
    res.json(module);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE module
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) return res.status(404).json({ msg: "Module not found" });
    res.json({ msg: "Module deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
