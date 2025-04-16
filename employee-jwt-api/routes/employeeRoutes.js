const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createEmployee, getEmployees } = require('../controllers/employeeController');

router.post('/', protect, createEmployee);
router.get('/', protect, getEmployees);

module.exports = router;
