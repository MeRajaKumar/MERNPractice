const express = require('express');
const router = express.Router();
const subjCtrl = require('../controllers/subjectController');

router.post('/', subjCtrl.createSubject);           // create subject
router.post('/assign', subjCtrl.assignSubject);      // assign subject to employee
router.get('/employee/:employeeId', subjCtrl.getSubjectsForEmployee); // get subjects for employee
router.get('/', subjCtrl.getAllSubjects); // get all subjects

module.exports = router;
