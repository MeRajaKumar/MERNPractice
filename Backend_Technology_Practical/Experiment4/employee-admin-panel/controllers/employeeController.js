const Employee = require("../models/Employee");

// List all employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.render("dashboard/employee", { employees });
};

// Create employee
exports.createEmployee = async (req, res) => {
  const { name, email, role, department, salary } = req.body;
  try {
    await Employee.create({ name, email, role, department, salary });
    res.redirect("/employees");
  } catch (err) {
    res.send("Error: " + err.message);
  }
};

// Show edit form
exports.editEmployeeForm = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render('dashboard/editEmployee', { employee });
};

// Update employee
exports.updateEmployee = async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/employees');
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/employees');
};
