const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
};

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};
