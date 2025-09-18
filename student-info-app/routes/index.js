// routes/index.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Student Info App', message: 'Welcome! Go to /students to view the list.' });
});

module.exports = router;
