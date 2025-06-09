const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'thisisoursecret';

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      console.log('Signup failed: Missing required fields');
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Signup failed: Email already registered:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    console.log('New user created successfully:', { id: newUser._id, email: newUser.email });

    // Generate token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token generated for new user');

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Signup error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      message: 'Internal server error during signup',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      console.log('Login failed: Missing credentials');
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for user:', { id: user._id, email: user.email });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({
      message: 'Internal server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 