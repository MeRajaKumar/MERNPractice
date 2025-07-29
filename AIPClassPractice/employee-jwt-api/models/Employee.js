const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    role: String,
    salary: Number
});

module.exports = mongoose.model('Employee', employeeSchema);
