// routes/students.js
const express = require('express');
const router = express.Router();

// In-memory "DB"
let students = [
  { id: 1, name: 'Raja Kumar', age: 23, course: 'MCA' },
  { id: 2, name: 'Aayush Gupta', age: 22, course: 'BCA' }
];

// List
router.get('/', (req, res) => {
  res.render('students/index', { title: 'Students', students });
});

// New form
router.get('/new', (req, res) => {
  res.render('students/new', { title: 'Add Student' });
});

// Create
router.post('/', (req, res) => {
  const { name, age, course } = req.body;
  if (!name || !age || !course) {
    return res.render('students/new', {
      title: 'Add Student',
      error: 'All fields are required.',
      values: req.body
    });
  }
  const id = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
  students.push({ id, name, age: Number(age), course });
  res.redirect('/students');
});

// Detail
router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).render('error', { message: 'Student not found', error: {} });
  }
  res.render('students/show', { title: student.name, student });
});

module.exports = router;
