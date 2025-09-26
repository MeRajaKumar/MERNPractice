const express = require('express');
const router = express.Router();
const empCtrl = require('../controllers/employeeController');

router.post('/', empCtrl.createEmployee);
router.get('/', empCtrl.getAllEmployees);
router.get('/:id', empCtrl.getEmployeeById);
router.put('/:id', empCtrl.updateEmployee);
router.delete('/:id', empCtrl.deleteEmployee);

module.exports = router;
