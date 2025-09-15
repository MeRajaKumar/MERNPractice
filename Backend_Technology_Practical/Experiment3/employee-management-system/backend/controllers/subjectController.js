const Subject = require('../models/Subject');
const Employee = require('../models/Employee');

exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.assignSubject = async (req, res) => {
  try {
    const { employeeId, subjectId } = req.body;
    const employee = await Employee.findById(employeeId);
    const subject = await Subject.findById(subjectId);
    if (!employee || !subject) return res.status(404).json({ error: "Employee or Subject not found" });

    if (!employee.subjects.includes(subject._id)) {
      employee.subjects.push(subject._id);
      await employee.save();
    }
    res.json({ message: "Subject assigned", employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSubjectsForEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId).populate('subjects');
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee.subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
