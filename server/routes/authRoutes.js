const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// 💡 Route for signup
router.post('/signup', registerUser);

// 💡 Route for login
router.post('/login', loginUser);

module.exports = router; 