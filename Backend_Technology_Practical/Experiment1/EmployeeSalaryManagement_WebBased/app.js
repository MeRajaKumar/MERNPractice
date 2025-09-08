const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dataFilePath = path.join(__dirname, 'data', 'employees.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper functions
function readEmployeeData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading employee data:', err);
    return [];
  }
}

function writeEmployeeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing employee data:', err);
  }
}

function calculateSalary(rate, hours) {
  return rate * hours;
}

// Routes

// Add employee
app.post('/add', (req, res) => {
  const { name, position, hourlyRate, hoursWorked } = req.body;
  const employees = readEmployeeData();
  const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
  const salary = calculateSalary(hourlyRate, hoursWorked);
  employees.push({ id, name, position, hourlyRate, hoursWorked, salary });
  writeEmployeeData(employees);
  res.status(201).json({ message: 'Employee added successfully' });
});

// View employees
app.get('/employees', (req, res) => {
  const employees = readEmployeeData();
  res.json(employees);
});

// Update employee
app.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, position, hourlyRate, hoursWorked } = req.body;

  const employees = readEmployeeData();
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employee.name = name || employee.name;
  employee.position = position || employee.position;
  employee.hourlyRate = hourlyRate ? parseFloat(hourlyRate) : employee.hourlyRate;
  employee.hoursWorked = hoursWorked ? parseFloat(hoursWorked) : employee.hoursWorked;
  employee.salary = calculateSalary(employee.hourlyRate, employee.hoursWorked);

  writeEmployeeData(employees);
  res.json({ message: 'Employee updated successfully' });
});

// Delete employee
app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let employees = readEmployeeData();
  const index = employees.findIndex(emp => emp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(index, 1);
  writeEmployeeData(employees);
  res.json({ message: 'Employee deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});