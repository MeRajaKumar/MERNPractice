const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

// ✅ Route Handlers must be functions
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
