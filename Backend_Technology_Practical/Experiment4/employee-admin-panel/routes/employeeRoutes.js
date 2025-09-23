const express = require("express");
const router = express.Router();

// Import controller
const employeeController = require("../controllers/employeeController");

// Import auth middleware
const { ensureAuth } = require("../middleware/authMiddleware");

// Routes
router.get("/", ensureAuth, employeeController.getEmployees);
router.post("/", ensureAuth, employeeController.createEmployee);

// GET: Edit employee form
router.get("/edit/:id", ensureAuth, employeeController.editEmployeeForm);

// POST: Update employee
router.post("/edit/:id", ensureAuth, employeeController.updateEmployee);

// POST: Delete employee
router.post("/delete/:id", ensureAuth, employeeController.deleteEmployee);

module.exports = router;
