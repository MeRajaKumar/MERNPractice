const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

module.exports = router;
