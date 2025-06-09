const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'thisisoursecret';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Registration attempt for:', { name, email }); // Log registration attempt

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration failed: User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    console.log('New user created successfully:', { id: newUser._id, email: newUser.email });

    // Generate token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('JWT token generated successfully');

    // Send response with token
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
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email); // Log login attempt

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', { id: user._id, email: user.email });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('Password verified successfully');

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('JWT token generated successfully');

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
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 