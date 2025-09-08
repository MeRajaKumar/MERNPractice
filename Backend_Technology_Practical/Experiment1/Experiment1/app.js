const fs = require('fs');
const readline = require('readline');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data', 'employees.json');

// Read employee data
function readEmployeeData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading employee data:', err);
    return [];
  }
}

// Write employee data
function writeEmployeeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing employee data:', err);
  }
}

// Calculate salary
function calculateSalary(hourlyRate, hoursWorked) {
  return hourlyRate * hoursWorked;
}

// Main menu
function displayMenu() {
  console.log('\nEmployee Salary Management System');
  console.log('1. Add Employee');
  console.log('2. View Employees');
  console.log('3. Update Employee');
  console.log('4. Delete Employee');
  console.log('5. Exit');
  rl.question('Enter your choice: ', handleMenu);
}

// Handle menu choices
function handleMenu(choice) {
  switch (choice) {
    case '1':
      addEmployee();
      break;
    case '2':
      viewEmployees();
      break;
    case '3':
      updateEmployee();
      break;
    case '4':
      deleteEmployee();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      displayMenu();
  }
}

// Add employee
function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    rl.question('Enter position: ', (position) => {
      rl.question('Enter hourly rate: ', (hourlyRate) => {
        rl.question('Enter hours worked: ', (hoursWorked) => {
          const employees = readEmployeeData();
          const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
          const salary = calculateSalary(parseFloat(hourlyRate), parseFloat(hoursWorked));
          employees.push({ id, name, position, hourlyRate: parseFloat(hourlyRate), hoursWorked: parseFloat(hoursWorked), salary });
          writeEmployeeData(employees);
          console.log('Employee added successfully.');
          displayMenu();
        });
      });
    });
  });
}

// View employees
function viewEmployees() {
  const employees = readEmployeeData();
  if (employees.length === 0) {
    console.log('No employee records found.');
  } else {
    console.log('\nEmployee Records:');
    employees.forEach((emp) => {
      console.log(`ID: ${emp.id}, Name: ${emp.name}, Position: ${emp.position}, Hourly Rate: ${emp.hourlyRate}, Hours Worked: ${emp.hoursWorked}, Salary: ${emp.salary}`);
    });
  }
  displayMenu();
}

// Update employee
function updateEmployee() {
  rl.question('Enter employee ID to update: ', (id) => {
    const employees = readEmployeeData();
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (!employee) {
      console.log('Employee not found.');
      displayMenu();
    } else {
      rl.question(`Enter new name (${employee.name}): `, (name) => {
        rl.question(`Enter new position (${employee.position}): `, (position) => {
          rl.question(`Enter new hourly rate (${employee.hourlyRate}): `, (hourlyRate) => {
            rl.question(`Enter new hours worked (${employee.hoursWorked}): `, (hoursWorked) => {
              employee.name = name || employee.name;
              employee.position = position || employee.position;
              employee.hourlyRate = hourlyRate ? parseFloat(hourlyRate) : employee.hourlyRate;
              employee.hoursWorked = hoursWorked ? parseFloat(hoursWorked) : employee.hoursWorked;
              employee.salary = calculateSalary(employee.hourlyRate, employee.hoursWorked);
              writeEmployeeData(employees);
              console.log('Employee updated successfully.');
              displayMenu();
            });
          });
        });
      });
    }
  });
}

// Delete employee
function deleteEmployee() {
  rl.question('Enter employee ID to delete: ', (id) => {
    let employees = readEmployeeData();
    const index = employees.findIndex((emp) => emp.id === parseInt(id));
    if (index === -1) {
      console.log('Employee not found.');
    } else {
      employees.splice(index, 1);
      writeEmployeeData(employees);
      console.log('Employee deleted successfully.');
    }
    displayMenu();
  });
}

// Start application
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
displayMenu();